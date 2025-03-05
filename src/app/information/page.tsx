import Navigation from "../components/Navigation";
import InfoMap from "../components/InfoMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Information",
	description: "Information about the track and club",
};

export default function Information() {
	return (
		<main className="min-h-screen bg-stone-900 text-white">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">
					Courtown BMX Information
				</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{/* Contact Us Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						Contact Us
					</h2>
					<div className="space-y-2">
						<p>
							<span className="font-semibold">Email:</span>{" "}
							<a
								href="mailto:courtownbmxracing@gmail.com"
								className="text-purple-400 hover:text-yellow-400 transition-colors"
							>
								courtownbmxracing@gmail.com
							</a>
						</p>
						<p>
							<span className="font-semibold">WhatsApp Group:</span>{" "}
							<a
								href="https://www.instagram.com/courtownbmx/"
								className="text-purple-400 hover:text-yellow-400 transition-colors"
							>
								Click Here
							</a>
						</p>
						<p>
							<span className="font-semibold">Facebook:</span>{" "}
							<a
								href="https://www.facebook.com/people/Courtown-BMX/61559028380966/"
								className="text-purple-400 hover:text-yellow-400 transition-colors"
							>
								Click Here
							</a>
						</p>
						<p>
							<span className="font-semibold">Instagram:</span>{" "}
							<a
								href="https://chat.whatsapp.com/I28VDPqtCbbIId4dubFHzK"
								className="text-purple-400 hover:text-yellow-400 transition-colors"
							>
								Click Here
							</a>
						</p>
					</div>
				</section>

				{/* Location Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
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
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						Track Rules
					</h2>

					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold mb-3">General:</h3>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									All riders must be members or pay the pay-as-you-ride fee.
								</li>
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Appropriate gear, including a Cycling Ireland license, is
									required.
								</li>
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Riders under 14 must be accompanied by a parent or guardian.
								</li>
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									No smoking, littering, or inappropriate behavior is allowed.
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-3">Safety:</h3>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Full face helmets, long-sleeve jerseys, and pants are
									mandatory.
								</li>
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Do not bring glass, sharp objects, or pets to the track.
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-3">Track Use:</h3>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Only BMX bikes are allowed, no scooters, skateboards, or RC
									cars.
								</li>
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Ride in the correct direction and avoid stopping in the middle
									of the track.
								</li>
								<li className="flex items-start">
									<span className="text-purple-400 mr-2">•</span>
									Reckless or dangerous riding will not be tolerated.
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Volunteering Section */}
				<section>
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						Volunteering
					</h2>
					<p className="mb-4">
						Courtown BMX Club relies on the dedication and hard work of
						volunteers to keep the track running smoothly. Whether you can help
						with maintenance, event coordination, or coaching, your support is
						invaluable.
					</p>
					<p>
						Contact us via email at{" "}
						<a
							href="mailto:courtownbmxracing@gmail.com"
							className="text-purple-400 hover:text-yellow-400 transition-colors"
						>
							courtownbmxracing@gmail.com
						</a>{" "}
						to learn more about how you can contribute.
					</p>
				</section>
			</div>
		</main>
	);
}
