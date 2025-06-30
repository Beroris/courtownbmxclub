import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { supabase } from "@/lib/supabaseClient";
import Stripe from "stripe";

// It's more of a conceptual note for Route Handlers.
// For `req.text()` to work without Next.js trying to parse JSON,
// ensure the client sends `Content-Type: text/plain` (Stripe does this for webhooks).
// If `req.text()` throws, you might need a different way to read raw stream in Vercel env.
// However, the `req.text()` approach is generally correct for App Router webhooks.
export const dynamic = "force-dynamic"; // Ensures this route is not cached

export async function POST(req: Request) {
	const body = await req.text(); // Get the raw body as text
	const signature = req.headers.get("stripe-signature");

	if (!signature) {
		return new NextResponse("No signature header", { status: 400 });
	}

	let event: Stripe.Event;

	try {
		// Construct the event from the raw body and signature
		// process.env.STRIPE_WEBHOOK_SECRET! ensures TypeScript knows it's non-null
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (err: any) {
		console.error(`Webhook Error: ${err.message}`);
		return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
	}

	// Handle the event
	switch (event.type) {
		case "checkout.session.completed":
			const session = event.data.object as Stripe.Checkout.Session;
			console.log(`Checkout session completed! Session ID: ${session.id}`);

			// Extract metadata from the session. This is what we sent from create-checkout-session.
			const {
				riderName,
				phoneNumber,
				licenseNumber,
				clubAffiliation,
				membershipType,
				paymentMethod,
			} = session.metadata || {}; // Use optional chaining and default empty object

			// Log metadata to debug (remove in production)
			console.log("Received metadata:", {
				riderName,
				phoneNumber,
				licenseNumber,
				clubAffiliation,
				membershipType,
				paymentMethod,
			});

			// Ensure all required metadata is present for Supabase insertion
			if (
				!riderName ||
				!phoneNumber ||
				!licenseNumber ||
				!clubAffiliation ||
				!membershipType ||
				!paymentMethod
			) {
				console.error(
					"Missing required metadata in checkout session for Supabase insertion:",
					session.metadata
				);
				return new NextResponse("Missing metadata for database insertion", {
					status: 400,
				});
			}

			try {
				const { error } = await supabase.from("log_entries").insert([
					{
						name: riderName,
						license_number: licenseNumber,
						phone_number: phoneNumber,
						club_affiliation: clubAffiliation,
						membership_type: membershipType,
						payment_method: paymentMethod, // Should be 'online'
						payment_status: "paid_online", // New status for online payments
						waiver_agreed: true, // Assuming waiver is agreed if payment proceeds
						stripe_session_id: session.id, // Store session ID for reference
						stripe_payment_intent_id: session.payment_intent, // Store payment intent ID
						amount_paid: session.amount_total, // Store total amount paid (in cents)
						currency: session.currency,
						// Include created_at if your Supabase table doesn't automatically handle it
						// created_at: new Date().toISOString(),
					},
				]);

				if (error) {
					console.error(
						"Error inserting log entry from webhook to Supabase:",
						error
					);
					return new NextResponse(`Database error: ${error.message}`, {
						status: 500,
					});
				}

				console.log(
					"Log entry created successfully from webhook for:",
					riderName
				);

				// TODO: (Future Enhancement)
				// - Send a confirmation email to the customer (e.g., using SendGrid, Nodemailer)
				// - Generate a unique day pass code / QR code and include it in the email/confirmation
			} catch (dbErr: any) {
				console.error("Supabase operation failed in webhook:", dbErr);
				return new NextResponse(`Supabase error: ${dbErr.message}`, {
					status: 500,
				});
			}
			break;

		// You can handle other Stripe events here if needed (e.g., 'payment_intent.succeeded', 'charge.refunded')
		// case 'payment_intent.succeeded':
		//   const paymentIntent = event.data.object as Stripe.PaymentIntent;
		//   console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
		//   break;
		default:
			console.warn(`Unhandled event type ${event.type}`);
	}

	// Always return a 200 OK to Stripe to acknowledge receipt of the event
	return new NextResponse("OK", { status: 200 });
}
