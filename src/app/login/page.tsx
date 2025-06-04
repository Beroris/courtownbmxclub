"use client";

// pages/login.js
import { useState } from "react";
import { useRouter } from "next/navigation";
// Import useSupabaseClient from the auth-helpers-react library
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import Navigation from "../components/Navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	// Initialize the Supabase client
	const supabase = useSupabaseClient();
	const router = useRouter();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission
		setLoading(true);
		setMessage(""); // Clear any previous messages

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setMessage(`Error: ${error.message}`);
		} else if (data.user) {
			// If login is successful, redirect to the dashboard
			setMessage("Logged in! Redirecting...");
			router.push("/dashboard");
		} else {
			// This case handles situations where data.user is null but no error
			// (less common with signInWithPassword but good for robustness)
			setMessage("Login failed. Please check your credentials.");
		}
		setLoading(false);
	};

	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">Admin Login</h1>
				<p className="text-center text-stone-600 dark:text-stone-400 mt-4 text-lg">
					Sign in to access the administrative dashboard
				</p>
			</div>

			{/* Main Content */}
			<div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 p-8">
					<form onSubmit={handleLogin} className="space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Email Address *
							</label>
							<input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="password"
								className="block text-base font-semibold text-stone-800 dark:text-stone-100"
							>
								Password *
							</label>
							<input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800"
						>
							{loading ? "Signing In..." : "Sign In"}
						</button>

						{message && (
							<div
								className={`p-4 rounded-lg text-sm text-center ${
									message.startsWith("Error")
										? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
										: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
								}`}
							>
								{message}
							</div>
						)}
					</form>
				</div>
			</div>
		</main>
	);
}
