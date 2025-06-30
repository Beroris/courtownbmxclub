import Link from "next/link";

export default function CancelPage() {
	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50 flex flex-col justify-center items-center p-4">
			<div className="text-center bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 p-8 max-w-md">
				<h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
					Payment Cancelled
				</h1>
				<p className="text-lg text-stone-700 dark:text-stone-300 mb-6">
					Your payment was not completed. You can try again or contact us if you
					need help.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Link href="/log-book" passHref>
						<button className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
							Try Again
						</button>
					</Link>
					<Link href="/" passHref>
						<button className="w-full sm:w-auto bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
							Back to Home
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
