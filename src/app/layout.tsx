import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Courtown BMX Club",
	description:
		"Home of BMX in the sunny south east, offering sessions for all ages and skill levels.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.className}>
			<body className="bg-white text-gray-900">{children}</body>
		</html>
	);
}
