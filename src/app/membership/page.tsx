import Navigation from "../components/Navigation";

export default function Membership() {
	return (
		<main className="min-h-screen bg-stone-900 text-white">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">
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

					<div className="bg-stone-800 p-6 rounded-lg mb-8 flex flex-col">
						<div className="flex space-x-2">
							<span className="text-purple-400 mr-2">•</span>
							<span className="font-semibold">
								Club Membership Yearly (Per Person):
							</span>
							<span>€50</span>
							<span className="text-purple-400 mr-2">•</span>
							<span className="font-semibold">
								Club Membership Yearly (Per Person):
							</span>
							<span>€50</span>
							<span className="text-purple-400 mr-2">•</span>
							<span className="font-semibold">
								Club Membership Yearly (Per Person):
							</span>
							<span>€50</span>
						</div>
					</div>

					<p className="text-lg mb-6">
						Each rider must hold a valid Cycling Ireland License to participate
						on the track. You can register for membership and licenses via{" "}
						<a
							href="https://www.cyclingireland.ie"
							className="text-purple-400 hover:text-yellow-400 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							Cycling Ireland
						</a>
						. Check out the{" "}
						<a
							href="/information"
							className="text-purple-400 hover:text-yellow-400 transition-colors"
						>
							Club Page
						</a>{" "}
						for more information.
					</p>
				</div>

				{/* How to Renew Membership Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						How to Renew Membership
					</h2>
					<ol className="space-y-4 ml-6">
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">1.</span>
							<div>
								Log in (or create an account) on the{" "}
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
							<span className="text-purple-400 mr-2">2.</span>
							<div>
								Navigate to &quot;My Memberships&quot; and select &quot;Add Club
								Membership&quot;.
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">3.</span>
							<div>
								Choose the appropriate membership fee and proceed to payment.
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
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
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
