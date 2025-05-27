"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navigation from "../components/Navigation";

export default function LogPage() {
	const [name, setName] = useState("");
	const [licenseNumber, setLicenseNumber] = useState("");
	const [membershipType, setMembershipType] = useState("member");
	const [paymentMethod, setPaymentMethod] = useState("online");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");

		try {
			// Directly insert into Supabase (no MockAPI check)
			const { data, error } = await supabase.from("log_entries").insert([
				{
					name,
					license_number: membershipType === "member" ? licenseNumber : null,
					membership_type: membershipType,
					payment_method: requiresPayment ? paymentMethod : null,
				},
			]);

			if (error) {
				setMessage(`Error: ${error.message}`);
				return;
			}

			// Clear the form
			setName("");
			setLicenseNumber("");
			setMembershipType("guest");
			setPaymentMethod("online");
			setMessage("Log entry saved successfully!");
		} catch (err: any) {
			setMessage(`Error: ${err.message}`);
		}
	};

	const handlePayment = () => {
		// Placeholder for payment functionality
		if (paymentMethod === "cash") {
			setMessage("Please pay €5 in cash to staff member.");
		} else {
			setMessage("Online payment functionality coming soon!");
		}
	};

	const requiresPayment = membershipType === "guest";

	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">Log Book</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Name
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

						<div className="space-y-2">
							<label
								htmlFor="membership"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Membership Type
							</label>
							<select
								id="membership"
								value={membershipType}
								onChange={(e) => setMembershipType(e.target.value)}
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus-visible:ring-yellow-400 focus-visible:border-yellow-400 transition"
							>
								<option value="member">Member</option>
								<option value="guest">Guest</option>
							</select>
						</div>

						{!requiresPayment && (
							<div className="space-y-2">
								<label
									htmlFor="license"
									className="block text-base font-semibold text-stone-800 dark:text-stone-100"
								>
									License Number
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
						)}

						{requiresPayment && (
							<div className="space-y-4">
								<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
									<h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
										Payment Required
									</h3>
									<p className="text-yellow-700 dark:text-yellow-300 text-sm">
										{membershipType === "guest"
											? "Guest fee: €5 (First session is free)"
											: "Daily fee: €5"}
									</p>
								</div>

								{membershipType === "guest" && (
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
								)}

								<div className="flex justify-center">
									<button
										type="button"
										onClick={handlePayment}
										className="max-w-xs w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										{paymentMethod === "cash"
											? "Confirm Cash Payment"
											: "Pay Online"}
									</button>
								</div>
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
						>
							Submit
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
