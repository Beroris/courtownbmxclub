import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	output: "export",
	images: {
		unoptimized: true,
	},
	// Force Next.js to use a fixed build ID, e.g. "build"
	generateBuildId: async () => "build",
};

export default nextConfig;
