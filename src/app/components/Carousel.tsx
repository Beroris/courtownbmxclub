"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const autoMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Clear any existing timers
	const clearTimers = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		if (autoMoveTimeoutRef.current) {
			clearTimeout(autoMoveTimeoutRef.current);
			autoMoveTimeoutRef.current = null;
		}
	}, []);

	// Start automatic movement
	const startAutoPlay = useCallback(() => {
		if (!isAutoPlaying) return;

		clearTimers();
		timerRef.current = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);
	}, [isAutoPlaying, clearTimers]);

	// Handle manual navigation
	const handleManualNavigation = useCallback(
		(newIndex: number) => {
			if (isTransitioning) return; // Prevent rapid clicking

			setIsTransitioning(true);
			setCurrentIndex(newIndex);

			// Pause auto-play temporarily after manual interaction
			setIsAutoPlaying(false);
			clearTimers();

			// Resume auto-play after 10 seconds of no interaction
			autoMoveTimeoutRef.current = setTimeout(() => {
				setIsAutoPlaying(true);
			}, 10000);

			// Reset transition state
			setTimeout(() => {
				setIsTransitioning(false);
			}, 500); // Match transition duration
		},
		[isTransitioning, clearTimers]
	);

	const nextSlide = useCallback(() => {
		const newIndex = (currentIndex + 1) % images.length;
		handleManualNavigation(newIndex);
	}, [currentIndex, handleManualNavigation]);

	const prevSlide = useCallback(() => {
		const newIndex = (currentIndex - 1 + images.length) % images.length;
		handleManualNavigation(newIndex);
	}, [currentIndex, handleManualNavigation]);

	const goToSlide = useCallback(
		(index: number) => {
			handleManualNavigation(index);
		},
		[handleManualNavigation]
	);

	// Set up automatic movement
	useEffect(() => {
		if (isAutoPlaying) {
			startAutoPlay();
		}
		return clearTimers;
	}, [isAutoPlaying, startAutoPlay, clearTimers]);

	// Cleanup on unmount
	useEffect(() => {
		return clearTimers;
	}, [clearTimers]);

	return (
		<div className="relative w-full h-[70vh] overflow-hidden group">
			{/* Image Container */}
			<div className="absolute inset-0">
				<div
					className="relative w-full h-full transition-transform duration-500 ease-out will-change-transform"
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
						transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					}}
				>
					{images.map((image, index) => (
						<div
							key={index}
							className="absolute top-0 left-0 w-full h-full will-change-transform"
							style={{ transform: `translateX(${index * 100}%)` }}
						>
							<Image
								src={image}
								alt={`Carousel image ${index + 1}`}
								fill
								className="object-cover transition-opacity duration-300 ease-out"
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
			<div className="absolute inset-0 bg-black/40 transition-colors duration-300" />

			{/* Constant Text Layer */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center text-white max-w-4xl px-4 transition-transform duration-300 ease-out">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Welcome to Courtown BMX
					</h1>
					<p className="text-xl md:text-2xl">
						Experience the thrill of BMX racing in the sunny south east
					</p>
				</div>
			</div>

			{/* Enhanced Navigation buttons with improved animations */}
			<button
				onClick={prevSlide}
				disabled={isTransitioning}
				className="absolute left-4 top-1/2 -translate-y-1/2
					bg-black/50 backdrop-blur-sm text-white p-3 rounded-full
					transition-all duration-500 ease-out will-change-transform
					hover:bg-black/80 hover:scale-110 hover:shadow-lg
					active:scale-95 active:bg-black/90
					disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed
					group-hover:translate-x-1 group-hover:bg-black/60
					focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20"
				style={{
					transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
				}}
				aria-label="Previous image"
			>
				<svg
					className="w-6 h-6 transition-transform duration-300 ease-out hover:scale-110"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2.5}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<button
				onClick={nextSlide}
				disabled={isTransitioning}
				className="absolute right-4 top-1/2 -translate-y-1/2
					bg-black/50 backdrop-blur-sm text-white p-3 rounded-full
					transition-all duration-500 ease-out will-change-transform
					hover:bg-black/80 hover:scale-110 hover:shadow-lg
					active:scale-95 active:bg-black/90
					disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed
					group-hover:-translate-x-1 group-hover:bg-black/60
					focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20"
				style={{
					transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
				}}
				aria-label="Next image"
			>
				<svg
					className="w-6 h-6 transition-transform duration-300 ease-out hover:scale-110"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2.5}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>

			{/* Enhanced Dots indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						disabled={isTransitioning}
						className={`h-2.5 transition-all duration-500 ease-out transform will-change-transform
							hover:scale-125 active:scale-110
							focus:outline-none focus:ring-1 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-black/20 ${
								index === currentIndex
									? "w-5 bg-white scale-110 shadow-lg rounded-full"
									: "w-2.5 bg-white/50 hover:bg-white/75 rounded-full"
							}`}
						style={{
							transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
						}}
						aria-label={`Go to image ${index + 1}`}
					/>
				))}
			</div>

			{/* Auto-play indicator */}
			<div className="absolute top-4 right-4 flex items-center space-x-2 text-white/70 text-sm">
				<div
					className={`w-2 h-2 rounded-full transition-colors duration-300 ${
						isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
					}`}
				/>
				<span className="hidden sm:block">
					{isAutoPlaying ? "Auto" : "Manual"}
				</span>
			</div>
		</div>
	);
}
