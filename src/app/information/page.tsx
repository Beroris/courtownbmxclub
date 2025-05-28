import Navigation from "../components/Navigation";
import InfoMap from "../components/InfoMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Information",
	description: "Information about the track and club",
};

export default function Information() {
	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center text-purple-600 dark:text-purple-400">
					Courtown BMX Information
				</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{/* Contact Us Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2 text-purple-600 dark:text-purple-400">
						Contact Us
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-stone-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
							<h3 className="font-semibold text-lg mb-3 text-purple-600 dark:text-purple-400">
								Get In Touch
							</h3>
							<div className="space-y-3">
								<div className="flex items-center">
									<span className="text-yellow-400 mr-3 text-lg">✉</span>
									<div>
										<span className="font-medium text-sm text-stone-600 dark:text-stone-400">
											Email:
										</span>
										<br />
										<a
											href="mailto:courtownbmxracing@gmail.com"
											className="text-purple-400 hover:text-yellow-400 transition-colors"
										>
											courtownbmxracing@gmail.com
										</a>
									</div>
								</div>
								<div className="flex items-center">
									<span className="text-yellow-400 mr-3 text-lg">💬</span>
									<div>
										<span className="font-medium text-sm text-stone-600 dark:text-stone-400">
											WhatsApp:
										</span>
										<br />
										<a
											href="https://chat.whatsapp.com/I28VDPqtCbbIId4dubFHzK"
											className="text-purple-400 hover:text-yellow-400 transition-colors"
											target="_blank"
										>
											Join Our Group Chat
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-stone-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
							<h3 className="font-semibold text-lg mb-3 text-yellow-600 dark:text-yellow-400">
								Follow Us
							</h3>
							<div className="space-y-3">
								<div className="flex items-center">
									<span className="text-purple-400 mr-3 text-lg">📘</span>
									<div>
										<span className="font-medium text-sm text-stone-600 dark:text-stone-400">
											Facebook:
										</span>
										<br />
										<a
											href="https://www.facebook.com/people/Courtown-BMX/61559028380966/"
											className="text-purple-400 hover:text-yellow-400 transition-colors"
											target="_blank"
										>
											Courtown BMX Page
										</a>
									</div>
								</div>
								<div className="flex items-center">
									<span className="text-purple-400 mr-3 text-lg">📷</span>
									<div>
										<span className="font-medium text-sm text-stone-600 dark:text-stone-400">
											Instagram:
										</span>
										<br />
										<a
											href="https://www.instagram.com/courtownbmx/"
											className="text-purple-400 hover:text-yellow-400 transition-colors"
											target="_blank"
										>
											@courtownbmx
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Location Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2 text-purple-600 dark:text-purple-400">
						Location
					</h2>
					<p className="mb-4">
						The track is located at Riverchapel Community Complex, Courtown, Co.
						Wexford. See map below:
					</p>
					<InfoMap />
				</section>

				{/* Track Rules Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2 text-purple-600 dark:text-purple-400">
						Track Rules
					</h2>

					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold mb-3">General:</h3>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									All riders must be members or pay the pay-as-you-ride fee.
								</li>
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Appropriate gear, including a Cycling Ireland license, is
									required.
								</li>
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Riders under 14 must be accompanied by a parent or guardian.
								</li>
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									No smoking, littering, or inappropriate behavior is allowed.
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-3">Safety:</h3>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Full face helmets, long-sleeve jerseys, and pants are
									mandatory.
								</li>
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Do not bring glass, sharp objects, or pets to the track.
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-3">Track Use:</h3>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Only BMX bikes are allowed, no scooters, skateboards, or RC
									cars.
								</li>
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Ride in the correct direction and avoid stopping in the middle
									of the track.
								</li>
								<li className="flex items-start">
									<span className="text-yellow-400 mr-2">•</span>
									Reckless or dangerous riding will not be tolerated.
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Volunteering Section */}
				<section>
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2 text-purple-600 dark:text-purple-400">
						Volunteering
					</h2>
					<div className="mb-8">
						<p className="text-lg mb-6">
							Courtown BMX Club relies on the dedication and hard work of
							volunteers to keep the track running smoothly. We&apos;re always
							looking for help in various areas:
						</p>

						<ul className="space-y-3 ml-6 mb-8">
							<li className="flex items-start">
								<span className="text-yellow-400 mr-2">•</span>
								<div>
									<span className="font-semibold">Track Maintenance:</span> Help
									maintain our professional BMX track and facilities.
								</div>
							</li>
							<li className="flex items-start">
								<span className="text-yellow-400 mr-2">•</span>
								<div>
									<span className="font-semibold">Event Coordination:</span>{" "}
									Assist with organizing races and club events.
								</div>
							</li>
							<li className="flex items-start">
								<span className="text-yellow-400 mr-2">•</span>
								<div>
									<span className="font-semibold">Coaching Support:</span> Share
									your experience and help new riders develop their skills.
								</div>
							</li>
						</ul>

						<p className="text-lg mb-6">
							Whether you can help occasionally or on a regular basis, your
							support is invaluable to our BMX community.
						</p>

						<div className="text-center">
							<div className="bg-white dark:bg-stone-700 p-4 rounded-lg inline-block shadow-md">
								<p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
									Ready to get involved?
								</p>
								<a
									href="mailto:courtownbmxracing@gmail.com"
									className="text-purple-400 hover:text-yellow-400 transition-colors font-semibold"
								>
									courtownbmxracing@gmail.com
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
