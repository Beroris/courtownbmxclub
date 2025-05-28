import Navigation from "./components/Navigation";
import Carousel from "./components/Carousel";
import Image from "next/image";

export default function Home() {
	return (
		<main className="bg-stone-50 dark:bg-stone-900">
			<Navigation />
			<Carousel />

			{/* Welcome Section - Integrated from Welcome.tsx */}
			<section className="py-16 bg-stone-50 dark:bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="flex justify-center">
							<div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group max-w-xs w-full">
								<Image
									src="/images/logo.png"
									alt="Courtown BMX Logo"
									width={300}
									height={300}
									className="object-contain w-full h-auto transform group-hover:scale-105 transition-transform duration-700 rounded-xl"
									priority
								/>
							</div>
						</div>
						<div className="text-stone-900 dark:text-stone-50">
							<h2 className="text-4xl font-bold mb-6 text-purple-600 dark:text-purple-400">
								Welcome to Courtown BMX
							</h2>
							<div className="space-y-4 text-lg leading-relaxed text-stone-700 dark:text-stone-300">
								<p>
									Courtown BMX Club was established in 2016 and, since then, has
									provided an informal and friendly atmosphere for riders and
									families alike.
								</p>
								<p>
									At Courtown BMX we are all-inclusive and encourage people of
									all ages and from all backgrounds to try out a fun, exciting
									outdoor pursuit, whether it be for leisure, socialising or
									competitive sport.
								</p>
								<p className="font-medium text-stone-900 dark:text-stone-100">
									Why not pop down to our track at Riverchapel Community Complex
									and try it out?!
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent"></div>

			{/* Why BMX? - Text Only Section */}
			<section className="py-16 bg-stone-100 dark:bg-stone-800">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold mb-8 text-stone-900 dark:text-stone-50">
						Why Choose BMX?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-700 dark:text-stone-300">
						<div className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out">
							<h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
								Build Confidence
							</h3>
							<p>
								BMX riding builds confidence, coordination, and physical fitness
								while providing an exciting challenge for riders of all skill
								levels.
							</p>
						</div>
						<div className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out delay-100">
							<h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
								Community Spirit
							</h3>
							<p>
								Join a supportive community where families come together,
								friendships are formed, and everyone encourages each other to
								improve.
							</p>
						</div>
						<div className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out delay-200">
							<h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
								Competitive Racing
							</h3>
							<p>
								Experience the thrill of competitive racing with events across
								Ireland, from beginner-friendly meets to national championships.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent animate-pulse"></div>

			{/* Track Features - Text Left, Image Right */}
			<section className="py-16 bg-stone-50 dark:bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="text-stone-900 dark:text-stone-50 text-center lg:text-left">
							<h2 className="text-4xl font-bold mb-6 text-center lg:text-left">
								Professional BMX Track
							</h2>
							<div className="space-y-4 text-lg">
								<p>
									Our track features professionally designed jumps, berms, and
									rhythm sections that challenge riders while maintaining safety
									standards.
								</p>
								<p>
									Located at Riverchapel Community Complex in Courtown, Co.
									Wexford, the track is designed for all skill levels from
									complete beginners to experienced racers.
								</p>
								<div className="space-y-2">
									<h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
										Track Features:
									</h3>
									<ul className="space-y-2 ml-4">
										<li className="flex items-start">
											<span className="text-purple-400 mr-2">•</span>
											8-meter starting hill with professional gate system
										</li>
										<li className="flex items-start">
											<span className="text-purple-400 mr-2">•</span>
											Technical rhythm sections and tabletop jumps
										</li>
										<li className="flex items-start">
											<span className="text-purple-400 mr-2">•</span>
											Banked turns and straightaway sections
										</li>
										<li className="flex items-start">
											<span className="text-purple-400 mr-2">•</span>
											Safe run-off areas and spectator viewing
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="flex justify-center transform hover:scale-[1.02] transition-transform duration-500">
							<div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group">
								<Image
									src="/images/carousel/carousel3.jpeg"
									alt="BMX Track Features"
									width={600}
									height={400}
									className="object-cover transform group-hover:scale-105 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent animate-pulse"></div>

			{/* Join Our Community - Text Only */}
			<section className="py-16 bg-stone-100 dark:bg-stone-800">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold mb-8 text-stone-900 dark:text-stone-50">
						Join Our BMX Family
					</h2>
					<p className="text-lg mb-8 text-stone-700 dark:text-stone-300">
						At Courtown BMX, we&apos;re more than just a club - we&apos;re a
						family. Since 2016, we&apos;ve welcomed riders of all ages and
						abilities, creating lasting friendships and unforgettable memories
						on and off the track.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
						<div className="bg-white dark:bg-stone-700 p-6 rounded-lg shadow-md transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out">
							<h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
								For Beginners
							</h3>
							<p className="text-stone-700 dark:text-stone-300">
								Never ridden BMX before? No problem! We provide guidance,
								support, and a welcoming environment for first-time riders. Your
								first session is completely free to try.
							</p>
						</div>
						<div className="bg-white dark:bg-stone-700 p-6 rounded-lg shadow-md transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out delay-100">
							<h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
								For Experienced Riders
							</h3>
							<p className="text-stone-700 dark:text-stone-300">
								Take your skills to the next level with competitive racing
								opportunities, advanced coaching, and connections to the wider
								Irish BMX community.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent animate-pulse"></div>

			{/* Quick Info - Membership & Events Highlights */}
			<section className="py-16 bg-stone-50 dark:bg-stone-900">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-center mb-12 text-stone-900 dark:text-stone-50">
						Get Started Today
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Membership */}
						<div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg border-l-4 border-purple-500 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out">
							<h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
								Membership
							</h3>
							<div className="space-y-3 text-stone-700 dark:text-stone-300">
								<p className="font-semibold">2025 Rates:</p>
								<div className="space-y-1">
									<p>
										First Member:{" "}
										<span className="font-bold text-stone-900 dark:text-stone-50">
											€50
										</span>
									</p>
									<p>
										Second Member:{" "}
										<span className="font-bold text-stone-900 dark:text-stone-50">
											€35
										</span>
									</p>
									<p>
										Whole Family:{" "}
										<span className="font-bold text-stone-900 dark:text-stone-50">
											€100
										</span>
									</p>
								</div>
								<p className="text-sm mt-4">
									Non-members: €5 per session (first session free!)
								</p>
							</div>
						</div>

						{/* Safety */}
						<div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg border-l-4 border-green-500 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out delay-100">
							<h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
								Safety First
							</h3>
							<div className="space-y-3 text-stone-700 dark:text-stone-300">
								<p>Required gear for track use:</p>
								<ul className="space-y-2">
									<li className="flex items-start">
										<span className="text-green-500 mr-2">•</span>
										Full face helmet
									</li>
									<li className="flex items-start">
										<span className="text-green-500 mr-2">•</span>
										Long sleeve jersey & pants
									</li>
									<li className="flex items-start">
										<span className="text-green-500 mr-2">•</span>
										Cycling Ireland license
									</li>
									<li className="flex items-start">
										<span className="text-green-500 mr-2">•</span>
										BMX bike only
									</li>
								</ul>
							</div>
						</div>

						{/* Events */}
						<div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg border-l-4 border-yellow-500 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out delay-200">
							<h3 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
								Events & Racing
							</h3>
							<div className="space-y-3 text-stone-700 dark:text-stone-300">
								<p>Join exciting BMX events across Ireland:</p>
								<ul className="space-y-2">
									<li className="flex items-start">
										<span className="text-yellow-500 mr-2">•</span>
										Regional races for all levels
									</li>
									<li className="flex items-start">
										<span className="text-yellow-500 mr-2">•</span>
										National championship series
									</li>
									<li className="flex items-start">
										<span className="text-yellow-500 mr-2">•</span>
										Training and coaching days
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent animate-pulse"></div>

			{/* Full Width Hero Image with Track Info */}
			<section
				className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20"
				style={{ backgroundImage: 'url("/images/carousel/carousel1.jpg")' }}
			>
				<div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-40 transition-all duration-500"></div>
				<div className="relative z-10 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
					<div className="text-center text-white max-w-4xl w-full">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
							Experience BMX Racing
						</h2>
						<p className="text-lg md:text-xl mb-10">
							Professional track • Expert coaching • Family-friendly atmosphere
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
							<div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out">
								<h3 className="font-bold text-purple-400 mb-2 text-xl">
									Founded
								</h3>
								<p className="text-base">Established 2016</p>
							</div>
							<div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out delay-100">
								<h3 className="font-bold text-purple-400 mb-2 text-xl">
									Location
								</h3>
								<p className="text-base">
									Riverchapel Community Complex, Courtown, Co. Wexford
								</p>
							</div>
							<div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out delay-200">
								<h3 className="font-bold text-purple-400 mb-2 text-xl">
									Open To
								</h3>
								<p className="text-base">All ages and skill levels welcome</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent animate-pulse"></div>

			{/* Footer-style Contact Section */}
			<section className="py-16 bg-stone-800 dark:bg-stone-950 text-white">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
						{/* Social Links - now first */}
						<div>
							<h3 className="text-2xl font-bold mb-6 text-yellow-400">
								Follow Us
							</h3>
							<div className="space-y-4">
								<a
									href="https://www.facebook.com/people/Courtown-BMX/61559028380966/"
									target="_blank"
									rel="noopener noreferrer"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									Facebook
								</a>
								<a
									href="https://www.instagram.com/courtownbmx/"
									target="_blank"
									rel="noopener noreferrer"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									Instagram
								</a>
								<a
									href="https://chat.whatsapp.com/I28VDPqtCbbIId4dubFHzK"
									target="_blank"
									rel="noopener noreferrer"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									WhatsApp Group
								</a>
							</div>
						</div>

						{/* Get In Touch - now second */}
						<div>
							<h3 className="text-2xl font-bold mb-6 text-yellow-400">
								Get In Touch
							</h3>
							<div className="space-y-4">
								<div>
									<h4 className="font-semibold mb-2">Email</h4>
									<a
										href="mailto:courtownbmxracing@gmail.com"
										className="text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
									>
										courtownbmxracing@gmail.com
									</a>
								</div>
								<div>
									<h4 className="font-semibold mb-2">Location</h4>
									<p className="text-stone-300">
										Riverchapel Community Complex
										<br />
										Courtown, Co. Wexford
									</p>
								</div>
							</div>
						</div>

						{/* Quick Links - remains last */}
						<div>
							<h3 className="text-2xl font-bold mb-6 text-yellow-400">
								Quick Links
							</h3>
							<div className="space-y-4">
								<a
									href="/membership"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									Membership Information
								</a>
								<a
									href="/events"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									Events & Racing
								</a>
								<a
									href="/information"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									Track Rules & Info
								</a>
								<a
									href="https://www.cyclingireland.ie/events/find-an-event/"
									target="_blank"
									rel="noopener noreferrer"
									className="block text-purple-300 hover:text-yellow-400 transition-colors duration-300 hover:underline"
								>
									Irish BMX Events
								</a>
							</div>
						</div>
					</div>

					{/* Bottom Footer */}
					<div className="border-t border-stone-700 mt-12 pt-8 text-center">
						<p className="text-stone-400">
							© 2025 Courtown BMX Club. All rights reserved. | Established 2016
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
