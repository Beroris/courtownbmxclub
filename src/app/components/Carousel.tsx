"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
	`/images/carousel/carousel1.jpg`,
	`/images/carousel/carousel2.jpeg`,
	`/images/carousel/carousel3.jpeg`,
	`/images/carousel/carousel4.jpeg`,
	`/images/carousel/carousel5.jpeg`,
	`/images/carousel/carousel6.jpeg`,
];

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		);
	};

	return (
		<div className="relative w-full h-[70vh] overflow-hidden">
			{/* Image Container */}
			<div className="absolute inset-0">
				<div
					className="relative w-full h-full transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{images.map((image, index) => (
						<div
							key={index}
							className="absolute top-0 left-0 w-full h-full"
							style={{ transform: `translateX(${index * 100}%)` }}
						>
							<Image
								src={image}
								alt={`Carousel image ${index + 1}`}
								fill
								className="object-cover"
								priority={
									index === currentIndex ||
									index === (currentIndex + 1) % images.length
								}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Constant Overlay */}
			<div className="absolute inset-0 bg-black/40" />

			{/* Constant Text Layer */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center text-white max-w-4xl px-4">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Welcome to Courtown BMX
					</h1>
					<p className="text-xl md:text-2xl">
						Experience the thrill of BMX racing in the sunny south east
					</p>
				</div>
			</div>

			{/* Navigation buttons */}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors transform hover:scale-110 duration-200"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
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
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors transform hover:scale-110 duration-200"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>

			{/* Dots indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform hover:scale-125 ${
							index === currentIndex
								? "bg-white scale-110"
								: "bg-white/50 hover:bg-white/75"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
