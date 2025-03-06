"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const pathname = usePathname();

	return (
		<nav className="fixed w-full z-50 bg-stone-50/50 dark:bg-stone-900/70 backdrop-blur-sm border-b border-stone-200/50 dark:border-stone-700/80">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex-shrink-0">
						<Link href="/" className="flex items-center">
							<Image
								src={`/images/nav-logo.png`}
								alt="Courtown BMX"
								width={2000}
								height={2000}
								className="h-12 w-auto"
								priority
							/>
						</Link>
					</div>

					{/* Desktop Menu */}
					<div className="hidden lg:block">
						<div className="ml-10 flex items-center space-x-4">
							<Link
								href="/"
								className={`px-3 py-2 transition-colors font-semibold ${
									pathname === "/"
										? "text-yellow-400"
										: "text-stone-700 dark:text-stone-200 hover:text-yellow-400"
								}`}
							>
								Home
							</Link>
							<Link
								href="/events"
								className={`px-3 py-2 transition-colors font-semibold ${
									pathname === "/events"
										? "text-yellow-400"
										: "text-stone-700 dark:text-stone-200 hover:text-yellow-400"
								}`}
							>
								Events
							</Link>
							<Link
								href="/membership"
								className={`px-3 py-2 transition-colors font-semibold ${
									pathname === "/membership"
										? "text-yellow-400"
										: "text-stone-700 dark:text-stone-200 hover:text-yellow-400"
								}`}
							>
								Membership
							</Link>
							<Link
								href="/information"
								className={`px-3 py-2 transition-colors font-semibold ${
									pathname === "/information"
										? "text-yellow-400"
										: "text-stone-700 dark:text-stone-200 hover:text-yellow-400"
								}`}
							>
								Information
							</Link>
						</div>
					</div>

					{/* Desktop Social Links & Contact */}
					<div className="hidden lg:flex items-center space-x-4">
						<Link
							href="https://www.instagram.com/courtownbmx/"
							target="_blank"
							className="text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						>
							<FaInstagram className="h-5 w-5" />
						</Link>
						<Link
							href="https://www.facebook.com/people/Courtown-BMX/61559028380966/"
							target="_blank"
							className="text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						>
							<FaFacebook className="h-5 w-5" />
						</Link>
						<Link
							href="https://chat.whatsapp.com/I28VDPqtCbbIId4dubFHzK"
							target="_blank"
							className="text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						>
							<FaWhatsapp className="h-5 w-5" />
						</Link>
						<Link
							href="/information"
							className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
						>
							Contact
						</Link>
					</div>

					{/* Hamburger Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="lg:hidden p-2 rounded-md text-stone-700 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors"
					>
						<span className="sr-only">Open menu</span>
						<div className="w-6 h-5 relative flex items-center justify-center">
							<span
								className={`absolute h-0.5 bg-current transform transition-all duration-300 ${
									isMenuOpen ? "w-7 rotate-45" : "w-6 -translate-y-2"
								}`}
							/>
							<span
								className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
									isMenuOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`absolute h-0.5 bg-current transform transition-all duration-300 ${
									isMenuOpen ? "w-7 -rotate-45" : "w-6 translate-y-2"
								}`}
							/>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden absolute top-16 inset-x-0 bg-stone-50/55 dark:bg-stone-900/85 backdrop-blur-sm transition-all duration-300 ease-in-out ${
					isMenuOpen
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-2 pointer-events-none"
				}`}
			>
				<div className="px-4 pt-2 pb-4 space-y-1">
					<Link
						href="/"
						className="block px-3 py-2 text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						Home
					</Link>
					<Link
						href="/events"
						className="block px-3 py-2 text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						Events
					</Link>
					<Link
						href="/membership"
						className="block px-3 py-2 text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						Membership
					</Link>
					<Link
						href="/information"
						className="block px-3 py-2 text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						Information
					</Link>
				</div>
				<div className="px-4 py-4 border-t border-stone-200/50 dark:border-stone-700/50">
					<div className="flex items-center space-x-4 mb-4">
						<Link
							href="https://instagram.com"
							target="_blank"
							className="text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<FaInstagram className="h-5 w-5" />
						</Link>
						<Link
							href="https://facebook.com"
							target="_blank"
							className="text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<FaFacebook className="h-5 w-5" />
						</Link>
						<Link
							href="https://whatsapp.com"
							target="_blank"
							className="text-stone-700 dark:text-stone-200 hover:text-yellow-400 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<FaWhatsapp className="h-5 w-5" />
						</Link>
					</div>
					<Link
						href="/contact"
						className="block w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
						onClick={() => setIsMenuOpen(false)}
					>
						Contact
					</Link>
				</div>
			</div>
		</nav>
	);
}
