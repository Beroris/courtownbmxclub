"use client";

import { useState } from "react";

export default function InfoMap() {
	const [loading, setLoading] = useState(true);

	const handleLoad = () => {
		setLoading(false);
	};

	return (
		<div className="map mt-5 relative">
			{loading && (
				<div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold">
					Map Loading...
				</div>
			)}
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4191.086588073432!2d-6.241346666293391!3d52.64026147151865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867e7451b1040b1%3A0x5a75af8002bff7d8!2sCourtown%20BMX%20Club!5e0!3m2!1sen!2sie!4v1738261127792!5m2!1sen!2sie"
				className="w-full max-w-[800px] h-[300px] rounded-lg shadow-lg border-0 focus:border-0 focus:outline-none"
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				onLoad={handleLoad}
			></iframe>
		</div>
	);
}
