import Link from "next/link";

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id?: string }>;
}) {
	const params = await searchParams;
	const sessionId = params.session_id;

	return (
		<main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50 flex flex-col justify-center items-center p-4">
			<div className="text-center bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/80 p-8 max-w-md">
				<h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
					Payment Successful! 🎉
				</h1>
				<p className="text-lg text-stone-700 dark:text-stone-300 mb-4">
					Thank you for purchasing a day pass for the BMX track.
				</p>
				{sessionId && (
					<p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
						Your transaction ID is: <strong>{sessionId}</strong>.
						<br />
						Please show this confirmation to staff.
					</p>
				)}
				<p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
					We'll send you an email shortly with details on how to use your pass,
					if applicable.
				</p>
				<Link href="/" passHref>
					<button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
						Back to Home
					</button>
				</Link>
			</div>
		</main>
	);
}
