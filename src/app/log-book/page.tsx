"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navigation from "../components/Navigation";

export default function LogPage() {
	const [name, setName] = useState("");
	const [licenseNumber, setLicenseNumber] = useState("");
	const [membershipType, setMembershipType] = useState("guest");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");

		if (!name || !licenseNumber || !membershipType) {
			setMessage("Error: All fields are required!");
			return;
		}

		// Validate that the name contains only letters (including accented letters) and spaces
		const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;
		if (!namePattern.test(name)) {
			setMessage("Error: Name must contain only letters and spaces.");
			return;
		}

		// Validate that the license number contains at least one number
		const licensePattern = /\d/;
		if (!licensePattern.test(licenseNumber)) {
			setMessage("Error: Invalid license number");
			return;
		}

		try {
			const { error } = await supabase.from("log_entries").insert([
				{
					name,
					license_number: licenseNumber,
					membership_type: membershipType,
				},
			]);

			if (error) {
				setMessage(`Error: ${error.message}`);
				return;
			}

			setName("");
			setLicenseNumber("");
			setMembershipType("daily");
			setMessage("Log entry saved successfully!");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setMessage(`Error: ${err.message}`);
			} else {
				setMessage("An unknown error occurred");
			}
		}
	};

	return (
		<>
			<Navigation />
			<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50 flex flex-col items-center justify-center">
				<div className="pt-24 pb-12">
					<h1 className="text-5xl font-bold text-center">Log Book</h1>
				</div>

				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
					<div className="bg-stone-200 dark:bg-stone-800 p-8 rounded-lg shadow-md">
						<form
							onSubmit={handleSubmit}
							className="space-y-6 max-w-4xl mx-auto"
						>
							<div className="space-y-2">
								<label className="block text-sm font-medium">Name:</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm
									focus:outline-none focus:ring-2 focus:ring-purple-400
									focus:border-purple-400"
								/>
							</div>

							<div className="space-y-2">
								<label className="block text-sm font-medium">
									License Number:
								</label>
								<input
									type="text"
									value={licenseNumber}
									onChange={(e) => setLicenseNumber(e.target.value)}
									required
									className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm
									focus:outline-none focus:ring-2 focus:ring-purple-400
									focus:border-purple-400"
								/>
							</div>

							<div className="space-y-2">
								<label className="block text-sm font-medium">
									Membership Type:
								</label>
								<select
									value={membershipType}
									onChange={(e) => setMembershipType(e.target.value)}
									className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm
									focus:outline-none focus:ring-2 focus:ring-purple-400
									focus:border-purple-400"
								>
									<option value="daily">Day Pass</option>
									<option value="yearly">Yearly Membership</option>
								</select>
							</div>

							<button
								type="submit"
								className="w-full bg-yellow-400 text-stone-900 py-2 px-4 rounded-md
								hover:bg-yellow-500 focus:outline-none focus:ring-2
								focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200
								font-semibold"
							>
								Submit
							</button>
						</form>

						{message && (
							<p
								className={`mt-4 p-4 rounded-md ${
									message.includes("Error")
										? "bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-200"
										: "bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-200"
								}`}
							>
								{message}
							</p>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
