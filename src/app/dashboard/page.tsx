"use client"; // Added this directive

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react"; // Import React for component structure and typing
import Navigation from "../components/Navigation";

// Define interfaces for type safety
interface LogEntry {
	id: string;
	created_at: string;
	name: string;
	license_number: string | null;
	phone_number: string;
	club_affiliation: string;
	membership_type: "member" | "guest";
	payment_method: "member" | "cash" | "online" | null;
	payment_status: string | null;
	waiver_agreed: boolean;
}

interface UserProfile {
	role: string;
}

export default function Dashboard() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	const [logs, setLogs] = useState<LogEntry[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [filterDate, setFilterDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [viewMode, setViewMode] = useState<"day" | "week">("day");
	const [activeFilter, setActiveFilter] = useState<
		"today" | "yesterday" | "week" | "custom"
	>("today");

	const fetchLogs = useCallback(
		async (date: string) => {
			setLoading(true);
			setError(null);

			try {
				const { data, error } = await supabase
					.from("log_entries")
					.select("*")
					.gte("created_at", `${date}T00:00:00.000Z`)
					.lte("created_at", `${date}T23:59:59.999Z`)
					.order("created_at", { ascending: false });

				if (error) {
					console.error("Error fetching logs:", error);
					setError(`Failed to fetch logs: ${error.message}`);
				} else {
					setLogs((data as LogEntry[]) || []);
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "An unknown error occurred";
				setError(`An unexpected error occurred: ${errorMessage}`);
			} finally {
				setLoading(false);
			}
		},
		[supabase]
	);

	const fetchWeekLogs = useCallback(
		async (startDate: string) => {
			setLoading(true);
			setError(null);

			try {
				const start = new Date(startDate);
				const end = new Date(startDate);
				end.setDate(start.getDate() + 6); // Sunday

				const { data, error } = await supabase
					.from("log_entries")
					.select("*")
					.gte(
						"created_at",
						`${start.toISOString().split("T")[0]}T00:00:00.000Z`
					)
					.lte("created_at", `${end.toISOString().split("T")[0]}T23:59:59.999Z`)
					.order("created_at", { ascending: false });

				if (error) {
					console.error("Error fetching logs:", error);
					setError(`Failed to fetch logs: ${error.message}`);
				} else {
					setLogs((data as LogEntry[]) || []);
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "An unknown error occurred";
				setError(`An unexpected error occurred: ${errorMessage}`);
			} finally {
				setLoading(false);
			}
		},
		[supabase]
	);

	useEffect(() => {
		async function checkAuthAndFetchLogs() {
			if (!user) {
				router.push("/login");
				return;
			}

			const { data: profile, error: profileError } = await supabase
				.from("profiles")
				.select("role")
				.eq("id", user.id)
				.single();

			if (profileError) {
				console.error(
					"Error fetching user profile for admin check:",
					profileError
				);
				setError(
					`Authorization check failed: ${
						profileError.message || "Could not retrieve user profile or role."
					}`
				);
				setLoading(false);
				router.push("/login?message=Not authorized");
				return;
			}

			const typedProfile = profile as UserProfile;
			if (!typedProfile || typedProfile.role !== "admin") {
				console.warn(
					"Authorization check failed: Profile data inconsistent or user is not an admin.",
					{ userId: user.id, profileData: typedProfile }
				);
				setError(
					"You do not have administrative access. Please log in with an admin account."
				);
				setLoading(false);
				router.push("/login?message=Not authorized");
				return;
			}

			setIsAdmin(true);
			await fetchLogs(filterDate);
		}

		checkAuthAndFetchLogs();
	}, [user, router, supabase, filterDate, fetchLogs]);

	const handleLogout = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signOut();
		if (error) {
			setError(`Error logging out: ${error.message}`);
			setLoading(false);
		} else {
			router.push("/login");
		}
	};

	const handleDateQuickSelect = (
		daysOffset: number,
		filterType: "today" | "yesterday" | "week"
	) => {
		if (filterType === "week") {
			// Calculate this week's Monday
			const today = new Date();
			const dayOfWeek = today.getDay();
			const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday (0), go back 6 days, otherwise calculate offset to Monday
			const monday = new Date(today);
			monday.setDate(today.getDate() + mondayOffset);

			const mondayString = monday.toISOString().split("T")[0];
			setFilterDate(mondayString);
			setViewMode("week");
			setActiveFilter("week");
			fetchWeekLogs(mondayString);
		} else {
			const date = new Date();
			date.setDate(date.getDate() + daysOffset);
			const dateString = date.toISOString().split("T")[0];
			setFilterDate(dateString);
			setViewMode("day");
			setActiveFilter(filterType);
			fetchLogs(dateString);
		}
	};

	const handleCustomDateChange = (newDate: string) => {
		setFilterDate(newDate);
		setViewMode("day");
		setActiveFilter("custom");
		fetchLogs(newDate);
	};

	const getResultsSummary = () => {
		if (viewMode === "week") {
			const start = new Date(filterDate);
			const end = new Date(filterDate);
			end.setDate(start.getDate() + 6);

			return `Showing ${
				logs.length
			} entries for week of ${start.toLocaleDateString("en-IE", {
				day: "numeric",
				month: "short",
			})} - ${end.toLocaleDateString("en-IE", {
				day: "numeric",
				month: "short",
				year: "numeric",
			})}`;
		} else {
			return `Showing ${logs.length} entries for ${new Date(
				filterDate
			).toLocaleDateString("en-IE", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			})}`;
		}
	};

	if (loading) {
		return (
			<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
				<Navigation />
				<div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
						<p className="text-stone-600 dark:text-stone-400">
							Loading dashboard...
						</p>
					</div>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
				<Navigation />
				<div className="pt-24 pb-12 flex items-center justify-center min-h-screen px-4">
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md w-full text-center">
						<h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">
							Error
						</h2>
						<p className="text-red-700 dark:text-red-300">{error}</p>
					</div>
				</div>
			</main>
		);
	}

	if (!user || !isAdmin) return null;

	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">Admin Dashboard</h1>
				<p className="text-center text-stone-600 dark:text-stone-400 mt-4 text-lg">
					Track visitor log entries and manage access
				</p>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{/* Enhanced Filter Section */}
				<div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 p-6 mb-8">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
							Filter by Date
						</h3>

						{/* Quick Date Buttons */}
						<div className="flex flex-wrap gap-2">
							<button
								onClick={() => handleDateQuickSelect(0, "today")}
								className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800 ${
									activeFilter === "today"
										? "bg-purple-600 hover:bg-purple-700 text-white"
										: "bg-stone-600 hover:bg-stone-700 text-white"
								}`}
							>
								Today
							</button>
							<button
								onClick={() => handleDateQuickSelect(-1, "yesterday")}
								className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800 ${
									activeFilter === "yesterday"
										? "bg-purple-600 hover:bg-purple-700 text-white"
										: "bg-stone-600 hover:bg-stone-700 text-white"
								}`}
							>
								Yesterday
							</button>
							<button
								onClick={() => handleDateQuickSelect(0, "week")}
								className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800 ${
									activeFilter === "week"
										? "bg-purple-600 hover:bg-purple-700 text-white"
										: "bg-stone-600 hover:bg-stone-700 text-white"
								}`}
							>
								Week View
							</button>
						</div>

						{/* Custom Date Picker */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
							<label
								htmlFor="filterDate"
								className="text-base font-medium text-stone-700 dark:text-stone-300"
							>
								Or select custom date:
							</label>
							<input
								type="date"
								id="filterDate"
								value={filterDate}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									handleCustomDateChange(e.target.value);
								}}
								className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
							/>
						</div>

						{/* Results Summary */}
						<div className="text-sm text-stone-600 dark:text-stone-400">
							{getResultsSummary()}
						</div>
					</div>
				</div>

				{/* Data Table Section */}
				<div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 overflow-hidden">
					{logs.length === 0 ? (
						<div className="p-12 text-center">
							<div className="mb-4">
								<svg
									className="mx-auto h-12 w-12 text-stone-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
								No entries found
							</h3>
							<p className="text-stone-600 dark:text-stone-400">
								{viewMode === "week"
									? `No rider sign-ins for the selected week.`
									: `No rider sign-ins for ${new Date(
											filterDate
									  ).toLocaleDateString()}.`}
							</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-stone-200 dark:divide-stone-700">
								<thead className="bg-stone-50 dark:bg-stone-900">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											{viewMode === "week" ? "Date & Time" : "Time"}
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											Rider Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											Emergency Contact
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											Club
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											Type
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											Payment Method
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
											License No.
										</th>
									</tr>
								</thead>
								<tbody className="bg-white dark:bg-stone-800 divide-y divide-stone-200 dark:divide-stone-700">
									{logs.map((log: LogEntry) => (
										<tr
											key={log.id}
											className="hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-150"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 dark:text-stone-100">
												{viewMode === "week"
													? new Date(log.created_at).toLocaleDateString(
															"en-IE",
															{
																weekday: "short",
																month: "short",
																day: "numeric",
															}
													  ) +
													  " " +
													  new Date(log.created_at).toLocaleTimeString()
													: new Date(log.created_at).toLocaleTimeString()}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-medium text-stone-900 dark:text-stone-100">
													{log.name}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 dark:text-stone-100">
												{log.phone_number}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 dark:text-stone-100">
												{log.club_affiliation}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
														log.membership_type === "member"
															? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
															: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
													}`}
												>
													{log.membership_type}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
														log.payment_method === "member"
															? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
															: log.payment_method === "cash"
															? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
															: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
													}`}
												>
													{log.payment_method || "N/A"}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 dark:text-stone-100">
												{log.license_number || "N/A"}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Logout Section - Moved to Bottom */}
				<div className="mt-12 text-center">
					<button
						onClick={handleLogout}
						className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800 shadow-lg"
					>
						Sign Out
					</button>
				</div>
			</div>
		</main>
	);
}
