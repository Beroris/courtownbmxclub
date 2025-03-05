import type { Metadata } from "next";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
	title: "Page not found",
	description: "Page not found",
};

export default function NotFound() {
	return (
		<div>
			<Navigation />
			<h1 className="h-screen flex justify-center items-center">
				<span className="text-yellow-400 text-4xl mr-4">404</span>
				<span className="text-4xl font-bold">-</span>
				<span className="text-purple-400 text-4xl font-bold">
					Page Not Found
				</span>
			</h1>
		</div>
	);
}
