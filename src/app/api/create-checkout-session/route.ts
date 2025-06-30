import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req: Request) {
	try {
		// We'll receive form data from the client-side log-book page
		const { riderName, phoneNumber, licenseNumber, clubAffiliation } =
			await req.json();

		// Basic validation of incoming data (important before hitting Stripe)
		if (!riderName || !phoneNumber || !licenseNumber || !clubAffiliation) {
			return NextResponse.json(
				{ message: "Missing required data for checkout session" },
				{ status: 400 }
			);
		}

		// Get the origin for dynamic success/cancel URLs
		const origin = req.headers.get("origin");
		if (!origin) {
			return NextResponse.json(
				{ message: "Origin header not found" },
				{ status: 400 }
			);
		}

		// Define your day pass product details
		const dayPassPrice = 500; // €5.00 (in cents, assuming EUR based on your currency symbol)
		const dayPassName = "BMX Track Day Pass";

		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: "eur", // Set currency to EUR (or 'usd', 'gbp' as appropriate)
						product_data: {
							name: dayPassName,
							description: `One day access for ${riderName} (License: ${licenseNumber}) from ${clubAffiliation}.`,
							// Metadata here is for Stripe's display and records, not for webhook.
							// For webhook, use session-level metadata below.
						},
						unit_amount: dayPassPrice,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			metadata: {
				// This metadata is passed to the webhook event!
				riderName,
				phoneNumber,
				licenseNumber,
				clubAffiliation,
				membershipType: "guest", // Explicitly note it's a guest pass
				paymentMethod: "online", // Explicitly note online payment
			},
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel`,
		});

		return NextResponse.json({ sessionId: session.id }, { status: 200 });
	} catch (error: any) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{ message: error.message || "Internal Server Error" },
			{ status: error.statusCode || 500 }
		);
	}
}
