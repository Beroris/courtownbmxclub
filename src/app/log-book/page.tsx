"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LogPage() {
	const [name, setName] = useState("");
	const [licenseNumber, setLicenseNumber] = useState("");
	const [membershipType, setMembershipType] = useState("guest");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");

		try {
			const res = await fetch(
				`https://67d59417286fdac89bbfc0e0.mockapi.io/license-numbers?license_number=${licenseNumber}`
			);

			if (!res.ok) {
				throw new Error(`Failed to fetch from MockAPI: ${res.statusText}`);
			}

			const dataFromMock = await res.json();

			// If Option B (fetching all), you'd filter:
			// const validLicense = dataFromMock.find((item: any) => item.license_number === licenseNumber);

			// If Option A, dataFromMock should be an array of matching items. If it's empty, there's no match.
			if (!Array.isArray(dataFromMock) || dataFromMock.length === 0) {
				setMessage("Error: Invalid license number");
				return;
			}

			// 2) If valid, proceed to insert into Supabase
			const { data, error } = await supabase.from("log_entries").insert([
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

			// 3) Clear the form
			setName("");
			setLicenseNumber("");
			setMembershipType("guest");
			setMessage("Log entry saved successfully!");
		} catch (err: any) {
			setMessage(`Error: ${err.message}`);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
					Log Book
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Name:
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-500
                         focus:border-orange-500"
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							License Number:
						</label>
						<input
							type="text"
							value={licenseNumber}
							onChange={(e) => setLicenseNumber(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-500
                         focus:border-orange-500"
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Membership Type:
						</label>
						<select
							value={membershipType}
							onChange={(e) => setMembershipType(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-500
                         focus:border-orange-500"
						>
							<option value="guest">Guest</option>
							<option value="daily">Daily</option>
							<option value="member">Member</option>
							<option value="yearly">Yearly</option>
						</select>
					</div>

					<button
						type="submit"
						className="w-full bg-orange-600 text-white py-2 px-4 rounded-md
                       hover:bg-orange-700 focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
					>
						Submit
					</button>
				</form>

				{message && (
					<p
						className={`mt-4 p-4 rounded-md ${
							message.includes("Error")
								? "bg-red-100 text-red-700"
								: "bg-green-100 text-green-700"
						}`}
					>
						{message}
					</p>
				)}
			</div>
		</div>
	);
}
