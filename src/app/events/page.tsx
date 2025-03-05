import Navigation from "../components/Navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Events",
	description: "Events and information for the club",
};

export default function Events() {
	return (
		<main className="min-h-screen bg-stone-900 text-white">
			<Navigation />

			{/* Hero Section with Title */}
			<div className="pt-24 pb-12">
				<h1 className="text-5xl font-bold text-center">Courtown BMX Events</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{/* Introduction */}
				<div className="mb-12">
					<p className="text-lg mb-6">
						Courtown BMX Club is a proud supporter of BMX racing and riding in
						Ireland. Whether you&apos;re a beginner or an experienced rider,
						there are plenty of exciting events and opportunities to participate
						in BMX racing at the local, regional, and national levels.
					</p>
					<p className="text-lg mb-6">
						Racing is one of (if not THE best) way to improve your riding skills
						and get faster. You can race at BMX events and it&apos;s a great day
						out for the whole family. You can view the full Irish BMX events
						calendar{" "}
						<a
							href="https://www.cyclingireland.ie/events/find-an-event/"
							className="text-purple-400 hover:text-yellow-400 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							here
						</a>
						.
					</p>
				</div>

				{/* BMX Events in Ireland Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						BMX Events in Ireland
					</h2>
					<p className="mb-4">
						BMX racing events in Ireland are organized and overseen by{" "}
						<span className="font-[600]">
							Cycling Ireland&apos;s BMX Commission
						</span>
						. These events include:
					</p>
					<ul className="space-y-4 ml-6">
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							<div>
								<span className="font-semibold">Regional Races:</span> Great for
								gaining experience and enjoying friendly competition.
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							<div>
								<span className="font-semibold">National Series:</span> Brings
								together the best riders from across the country.
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							<div>
								<span className="font-semibold">
									Training and Coaching Days:
								</span>{" "}
								Opportunities to improve your skills with expert guidance.
							</div>
						</li>
					</ul>
				</section>

				{/* How to Get Involved Section */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						How to Get Involved
					</h2>
					<ol className="space-y-4 ml-6">
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">1.</span>
							<div>
								<span className="font-semibold">Find an Event:</span> Visit the{" "}
								<a
									href="https://www.cyclingireland.ie/events/find-an-event/"
									className="text-purple-400 hover:text-yellow-400 transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									Cycling Ireland BMX Events Calendar
								</a>{" "}
								for upcoming events.
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">2.</span>
							<div>
								<span className="font-semibold">Prepare to Race:</span> Get the
								right gear and a BMX race license. Beginners are welcome!
							</div>
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">3.</span>
							<div>
								<span className="font-semibold">Join the Fun:</span> Meet other
								riders, improve your skills, and enjoy the thrill of BMX racing.
							</div>
						</li>
					</ol>
				</section>

				{/* Why Attend Section */}
				<section>
					<h2 className="text-2xl font-bold mb-6 border-b border-stone-700 pb-2">
						Why Attend BMX Events?
					</h2>
					<ul className="space-y-4 ml-6">
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							Experience the excitement of competitive BMX racing.
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							Learn from experienced riders and coaches.
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							Be part of a supportive BMX community.
						</li>
						<li className="flex items-start">
							<span className="text-purple-400 mr-2">•</span>
							Test your skills on tracks designed for all levels.
						</li>
					</ul>
				</section>
			</div>
		</main>
	);
}
