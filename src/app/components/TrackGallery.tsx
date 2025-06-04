"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface TrackImage {
	src: string;
	alt: string;
}

const trackImages: TrackImage[] = [
	{ src: "/images/track/track1.jpeg", alt: "BMX Track Overview" },
	{ src: "/images/track/track2.jpeg", alt: "BMX Track Overview of End" },
	{ src: "/images/track/track5.jpeg", alt: "BMX Track Overview Side View" },
	{
		src: "/images/track/track3.jpeg",
		alt: "BMX Track Overview from Entrance",
	},
	{ src: "/images/track/track4.jpeg", alt: "BMX Track Overview of Start" },
];

export default function TrackGallery() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isModalOpen) {
				setIsModalOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isModalOpen]);

	useEffect(() => {
		if (isModalOpen) {
			closeButtonRef.current?.focus();
			const focusableElements = modalRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusableElements && focusableElements.length > 0) {
				const firstElement = focusableElements[0] as HTMLElement;
				const lastElement = focusableElements[
					focusableElements.length - 1
				] as HTMLElement;

				const trapFocus = (event: KeyboardEvent) => {
					if (event.key !== "Tab") return;

					if (event.shiftKey) {
						if (document.activeElement === firstElement) {
							lastElement.focus();
							event.preventDefault();
						}
					} else {
						if (document.activeElement === lastElement) {
							firstElement.focus();
							event.preventDefault();
						}
					}
				};
				modalRef.current?.addEventListener("keydown", trapFocus);
				return () => {
					modalRef.current?.removeEventListener("keydown", trapFocus);
				};
			}
		}
	}, [isModalOpen]);

	const showPreviousImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? trackImages.length - 1 : prevIndex - 1
		);
	};

	const showNextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === trackImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	const showImage = (index: number) => {
		setCurrentImageIndex(index);
		setIsModalOpen(true);
	};

	return (
		<>
			{/* Track Gallery Grid */}
			<div className="space-y-4">
				{/* Main large image - Clickable to open gallery */}
				<div
					className="transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
					onClick={() => showImage(0)}
				>
					<div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group">
						<Image
							src={trackImages[0].src}
							alt={trackImages[0].alt}
							width={600}
							height={300}
							className="object-cover w-full h-48 transform group-hover:scale-105 transition-transform duration-700"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							Click to view gallery
						</div>
					</div>
				</div>

				{/* Two smaller images in grid */}
				<div className="grid grid-cols-2 gap-4">
					<div
						className="transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
						onClick={() => showImage(1)}
					>
						<div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
							<Image
								src={trackImages[1].src}
								alt={trackImages[1].alt}
								width={300}
								height={200}
								className="object-cover w-full h-32 transform group-hover:scale-105 transition-transform duration-700"
							/>
						</div>
					</div>
					<div
						className="transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
						onClick={() => showImage(2)}
					>
						<div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
							<Image
								src={trackImages[2].src}
								alt={trackImages[2].alt}
								width={300}
								height={200}
								className="object-cover w-full h-32 transform group-hover:scale-105 transition-transform duration-700"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Track Gallery Modal */}
			{isModalOpen && (
				<div
					ref={modalRef}
					className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
					onClick={() => setIsModalOpen(false)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="gallery-modal-title"
				>
					<div
						className="relative w-full max-w-6xl mx-auto p-4"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 id="gallery-modal-title" className="sr-only">
							Track Image Gallery
						</h2>
						{/* Close button */}
						<button
							ref={closeButtonRef}
							className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
							onClick={() => setIsModalOpen(false)}
							aria-label="Close gallery"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>

						{/* Gallery container */}
						<div className="relative">
							{/* Main image */}
							<div className="relative rounded-lg overflow-hidden">
								<Image
									src={trackImages[currentImageIndex].src}
									alt={trackImages[currentImageIndex].alt}
									width={1200}
									height={800}
									className="w-full h-auto max-h-[80vh] object-contain"
								/>
							</div>

							{/* Navigation arrows */}
							<button
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
								onClick={showPreviousImage}
								aria-label="Previous image"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
								onClick={showNextImage}
								aria-label="Next image"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>

							{/* Thumbnail navigation */}
							<div className="flex justify-center mt-4 space-x-2">
								{trackImages.map((image, index) => (
									<button
										key={index}
										className={`w-16 h-12 rounded overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
											index === currentImageIndex
												? "border-2 border-purple-500"
												: "border border-transparent hover:border-purple-300"
										}`}
										onClick={() => setCurrentImageIndex(index)}
										aria-label={`View image ${index + 1} of ${
											trackImages.length
										}`}
									>
										<Image
											src={image.src}
											alt=""
											width={64}
											height={48}
											className="w-full h-full object-cover"
											aria-hidden="true"
										/>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
