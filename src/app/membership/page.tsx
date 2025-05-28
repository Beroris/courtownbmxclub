import Navigation from "../components/Navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Membership",
	description: "Membership information for the club",
};

export default function Membership() {
	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center text-purple-600 dark:text-purple-400">
					Courtown BMX Membership
				</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{/* Introduction */}
				<div className="mb-12">
					<p className="text-lg mb-6">
						Courtown BMX Club Membership for 2025 is now available. Becoming a
						member grants you access to club activities, events, and track usage
						during official hours. Membership fees are as follows:
					</p>

					<div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg border-l-4 border-purple-500 mb-8">
						<div className="text-center mb-6">
							<h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
								Club Membership 2025
							</h3>
							<p className="text-stone-600 dark:text-stone-400">
								Choose the yearly membership option that works for you
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-stone-50 dark:bg-stone-700 p-6 rounded-lg text-center border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300">
								<h4 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">
									First Member
								</h4>
								<div className="text-3xl font-bold mb-2">€50</div>
								<p className="text-sm text-stone-600 dark:text-stone-400">
									Perfect for individuals joining the club
								</p>
							</div>

							<div className="bg-stone-50 dark:bg-stone-700 p-6 rounded-lg text-center border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800 transition-all duration-300">
								<h4 className="font-bold text-lg mb-2 text-yellow-600 dark:text-yellow-400">
									Second Member
								</h4>
								<div className="text-3xl font-bold mb-2">€35</div>
								<p className="text-sm text-stone-600 dark:text-stone-400">
									Additional family member discount
								</p>
							</div>

							<div className="bg-stone-50 dark:bg-stone-700 p-6 rounded-lg text-center border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300">
								<h4 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">
									Whole Family
								</h4>
								<div className="text-3xl font-bold mb-2 text-white">€100</div>
								<p className="text-sm text-stone-600 dark:text-stone-400">
									Best value for families
								</p>
							</div>
						</div>

						<div className="mt-6 text-center">
							<p className="text-sm text-stone-600 dark:text-stone-400">
								<span className="font-semibold">Non-members:</span> €5 per
								session (first session free!)
							</p>
						</div>
					</div>

					<div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 mb-6">
						<div className="text-center mb-4">
							<h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
								Important: License Required
							</h3>
						</div>

						<div className="text-center mb-4">
							<p className="text-stone-700 dark:text-stone-300">
								Each rider must hold a valid{" "}
								<span className="font-semibold text-yellow-600 dark:text-yellow-400">
									Cycling Ireland License
								</span>{" "}
								to participate on the track.
							</p>
						</div>

						<div className="flex flex-wrap justify-center gap-3">
							<a
								href="https://www.cyclingireland.ie"
								className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-5 py-2 rounded-lg font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get Your License
							</a>
							<a
								href="https://membership.cyclingireland.ie/clubpage/Courtown%20BMX%20Club"
								target="_blank"
								className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-5 py-2 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
							>
								View Club Page
							</a>
						</div>
					</div>

					<p className="text-lg mb-6">
						For more information about membership and licensing, check out the
						links above or contact us directly.
					</p>
				</div>

				{/* How to Renew Membership Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2 text-purple-600 dark:text-purple-400">
						How to Renew Membership
					</h2>
					<ol className="space-y-4 ml-6">
						<li className="flex items-start">
							<span className="text-yellow-400 mr-2">1.</span>
							<div>
								<span className="font-semibold">
									Log in (or create an account):
								</span>{" "}
								Visit the{" "}
								<a
									href="https://www.cyclingireland.ie"
									className="text-purple-400 hover:text-yellow-400 transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									Cycling Ireland Website
								</a>
								.
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-yellow-400 mr-2">2.</span>
							<div>
								<span className="font-semibold">Navigate to Memberships:</span>{" "}
								Select &quot;My Memberships&quot; and then &quot;Add Club
								Membership&quot;.
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-yellow-400 mr-2">3.</span>
							<div>
								<span className="font-semibold">Complete Payment:</span> Choose
								the appropriate membership fee and proceed to payment.
							</div>
						</li>
					</ol>

					<p className="mt-8">
						Please contact{" "}
						<a
							href="mailto:courtownbmxracing@gmail.com"
							className="text-purple-400 hover:text-yellow-400 transition-colors"
						>
							courtownbmxracing@gmail.com
						</a>{" "}
						for any membership-related inquiries or assistance with renewing
						licenses.
					</p>
				</section>

				{/* Track Usage Section */}
				<section>
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2 text-purple-600 dark:text-purple-400">
						Track Usage for Non-Members
					</h2>
					<p className="text-lg">
						Non-members are welcome to use the track during official hours but
						must pay a €5 fee per session (First session is free). Riders must
						have an active Cycling Ireland License to participate. Without a
						license, riders are not insured and cannot use the track.
					</p>
				</section>
			</div>
		</main>
	);
}
