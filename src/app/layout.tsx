import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // Import the new wrapper

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "Courtown BMX Club",
		template: "%s | Courtown BMX Club",
	},
	description:
		"Home of BMX in the sunny south east, offering sessions for all ages and skill levels.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={inter.className}
			style={{ scrollBehavior: "smooth" }}
		>
			<body className="bg-white text-gray-900 scroll-smooth overflow-x-hidden">
				<SessionProviderWrapper>{children}</SessionProviderWrapper>
			</body>
		</html>
	);
}
