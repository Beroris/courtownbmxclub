"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navigation from "../components/Navigation";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe from Stripe.js library

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function LogPage() {
	const [name, setName] = useState("");
	const [licenseNumber, setLicenseNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [clubAffiliation, setClubAffiliation] = useState("courtown");
	const [membershipType, setMembershipType] = useState("member");
	const [paymentMethod, setPaymentMethod] = useState("online"); // Default to online
	const [waiverAgreed, setWaiverAgreed] = useState(false);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const requiresPayment = membershipType === "guest";

	// --- Form Submission Handler ---
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);

		// --- Validation ---
		if (
			!name ||
			!phoneNumber ||
			!waiverAgreed ||
			!licenseNumber ||
			!membershipType
		) {
			setMessage(
				"Error: All fields are required and waiver must be agreed to!"
			);
			setLoading(false);
			return;
		}

		const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;
		if (!namePattern.test(name)) {
			setMessage("Error: Name must contain only letters and spaces.");
			setLoading(false);
			return;
		}

		const phonePattern = /^[\d\s\+\-\(\)]+$/;
		if (!phonePattern.test(phoneNumber)) {
			setMessage("Error: Please enter a valid phone number.");
			setLoading(false);
			return;
		}

		const licensePattern = /\d/;
		if (!licensePattern.test(licenseNumber)) {
			setMessage(
				"Error: Invalid license number (must contain at least one digit)."
			);
			setLoading(false);
			return;
		}

		if (membershipType === "guest" && paymentMethod === "online") {
			await handleOnlinePayment();
		} else {
			await submitLogEntryToSupabase(paymentMethod);
		}
		setLoading(false);
	};

	// --- Supabase Insertion Function ---
	const submitLogEntryToSupabase = async (finalPaymentMethod: string) => {
		try {
			let paymentStatus = null;
			if (membershipType === "member") {
				paymentStatus = "yearly";
			} else if (membershipType === "guest" && finalPaymentMethod === "cash") {
				paymentStatus = "cash_pending";
				setMessage(
					"Please pay €5 in cash to a staff member. Your sign-in is pending payment confirmation."
				);
			}

			const { error } = await supabase.from("log_entries").insert([
				{
					name,
					license_number: licenseNumber,
					phone_number: phoneNumber,
					club_affiliation: clubAffiliation,
					membership_type: membershipType,
					payment_method: finalPaymentMethod,
					payment_status: paymentStatus,
					waiver_agreed: waiverAgreed,
					stripe_session_id: null,
					stripe_payment_intent_id: null,
					amount_paid: null,
					currency: null,
				},
			]);

			if (error) {
				setMessage(`Error saving sign-in: ${error.message}`);
				return;
			}

			if (paymentStatus !== "cash_pending") {
				setName("");
				setLicenseNumber("");
				setPhoneNumber("");
				setClubAffiliation("courtown");
				setMembershipType("member");
				setPaymentMethod("online");
				setWaiverAgreed(false);
				setMessage("Sign-in saved successfully!");
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setMessage(`Error submitting sign-in: ${err.message}`);
			} else {
				setMessage("An unknown error occurred during sign-in submission.");
			}
		}
	};

	// --- Stripe Online Payment Initiation ---
	const handleOnlinePayment = async () => {
		setMessage("");
		setLoading(true);

		try {
			const response = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					riderName: name,
					phoneNumber: phoneNumber,
					licenseNumber: licenseNumber,
					clubAffiliation: clubAffiliation,
					// You can add more data here if needed for tracking
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					`Failed to create checkout session: ${
						errorData.message || response.statusText
					}`
				);
			}

			const { sessionId } = await response.json();

			// Redirect the user to Stripe Checkout
			const stripe = await stripePromise;
			if (!stripe) {
				throw new Error("Stripe.js failed to load. Please try again.");
			}
			const { error } = await stripe.redirectToCheckout({
				sessionId,
			});

			// This code only runs if redirectToCheckout fails for some reason
			if (error) {
				console.error("Stripe redirect error:", error);
				setMessage(
					`Payment initiation failed: ${error.message}. Please try again.`
				);
			}
		} catch (error: any) {
			console.error("Error during online payment process:", error);
			setMessage(
				`An unexpected error occurred: ${error.message}. Please try again.`
			);
		} finally {
			// setLoading(false); // Don't set false here, as successful redirect means user leaves page
			// If redirect fails, the error catch will set message and then setLoading(false) in handleSubmit
		}
	};

	// Helper to determine the text for the main form submission button
	const mainSubmitButtonText = () => {
		if (loading) {
			return "Processing...";
		}
		if (requiresPayment && paymentMethod === "online") {
			return "Proceed to Online Payment";
		}
		return "Submit Sign-In"; // Default for members or cash guests
	};

	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">Track Sign-In</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Rider Name */}
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Rider Name *
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
							/>
						</div>

						{/* Phone Number (ICE) */}
						<div className="space-y-2">
							<label
								htmlFor="phone"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Phone Number (In Case of Emergency) *
							</label>
							<input
								id="phone"
								type="tel"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								placeholder="e.g. 087 123 4567"
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
							/>
						</div>

						{/* Club Affiliation */}
						<div className="space-y-3">
							<label className="block text-base font-semibold text-stone-800 dark:text-stone-100">
								Club Affiliation *
							</label>
							<div className="space-y-2">
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="lucan"
										checked={clubAffiliation === "lucan"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Lucan BMX
									</span>
								</label>
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="courtown"
										checked={clubAffiliation === "courtown"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Courtown BMX
									</span>
								</label>
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="ratoath"
										checked={clubAffiliation === "ratoath"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Ratoath BMX
									</span>
								</label>
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="lisburn"
										checked={clubAffiliation === "lisburn"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Lisburn BMX
									</span>
								</label>
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="cork"
										checked={clubAffiliation === "cork"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Cork BMX
									</span>
								</label>
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="belfast"
										checked={clubAffiliation === "belfast"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Belfast City BMX Club
									</span>
								</label>
								<label className="flex items-center space-x-3">
									<input
										type="radio"
										name="club"
										value="unaffiliated"
										checked={clubAffiliation === "unaffiliated"}
										onChange={(e) => setClubAffiliation(e.target.value)}
										className="text-yellow-400 focus:ring-yellow-400"
									/>
									<span className="text-stone-700 dark:text-stone-300">
										Unaffiliated
									</span>
								</label>
							</div>
						</div>

						{/* Rider Type */}
						<div className="space-y-2">
							<label
								htmlFor="membership"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Rider Type *
							</label>
							<select
								id="membership"
								value={membershipType}
								onChange={(e) => setMembershipType(e.target.value)}
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus-visible:ring-yellow-400 focus-visible:border-yellow-400 transition"
							>
								<option value="member">Club Member</option>
								<option value="guest">Visitor (Has CI Licence - €5 fee)</option>
							</select>
						</div>

						{/* License Number - For all users */}
						<div className="space-y-2">
							<label
								htmlFor="license"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								CI License Number *
							</label>
							<input
								id="license"
								type="text"
								value={licenseNumber}
								onChange={(e) => setLicenseNumber(e.target.value)}
								required
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
							/>
						</div>

						{/* Payment Section for Visitors */}
						{requiresPayment && (
							<div className="space-y-4">
								<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
									<h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
										Payment Required
									</h3>
									<p className="text-yellow-700 dark:text-yellow-300 text-sm">
										Visitor fee: €5 per session
									</p>
									<p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
										Visitors must have a valid Cycling Ireland license
									</p>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="payment-method"
										className="block text-base font-semibold text-stone-800 dark:text-stone-100"
									>
										Payment Method
									</label>
									<select
										id="payment-method"
										value={paymentMethod}
										onChange={(e) => setPaymentMethod(e.target.value)}
										className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus-visible:ring-yellow-400 focus-visible:border-yellow-400 transition"
									>
										<option value="online">Online Payment</option>
										<option value="cash">Pay in Cash</option>
									</select>
								</div>
							</div>
						)}

						{/* Waiver Agreement */}
						<div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
							<h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
								Waiver and Release
							</h3>
							<div className="text-sm text-orange-700 dark:text-orange-300 space-y-2 mb-4">
								<p>
									I have read and agree to the Facility Rules & Code of Conduct
									and hereby waive, release and indemnify the Courtown BMX club
									and its committee, volunteers, sponsors, members and Fingal
									County Council, from any claims, losses or liabilities in the
									event of any injury, damage to property loss, partial or
									permanent disability, medical bills or death, resulting from
									activities at the BMX track.
								</p>
								<p>
									I grant permission for the use of the rider&apos;s name and/or
									likeness relating to their participation at the track.
								</p>
							</div>
							<label className="flex items-start space-x-3">
								<input
									type="checkbox"
									checked={waiverAgreed}
									onChange={(e) => setWaiverAgreed(e.target.checked)}
									className="mt-1 text-orange-500 focus:ring-orange-400"
									required
								/>
								<span className="text-orange-800 dark:text-orange-200 font-medium">
									I have read and agree to the above waiver *
								</span>
							</label>
						</div>

						{/* Main Submit Button - This button now handles ALL submissions */}
						<button
							type="submit"
							disabled={loading} // Disable if loading
							className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
						>
							{mainSubmitButtonText()} {/* Dynamic text based on state */}
						</button>
					</form>

					{message && (
						<p
							className={`mt-6 p-4 rounded-lg text-center font-semibold text-base transition-all duration-200 ${
								message.includes("Error")
									? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
									: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
							}`}
						>
							{message}
						</p>
					)}
				</div>
			</div>
		</main>
	);
}
