import Image from "next/image";

export default function Welcome() {
	return (
		<section className="py-16 bg-stone-50 dark:bg-stone-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div className="flex justify-center">
						<div className="w-84 h-84 rounded-full overflow-hidden bg-bg dark:bg-bg flex items-center justify-center shadow-lg">
							<Image
								src={`/images/logo.png`}
								alt="Courtown BMX Logo"
								width={500}
								height={300}
								className="object-contain"
							/>
						</div>
					</div>
					<div className="text-stone-900 dark:text-stone-50">
						<h2 className="text-3xl font-bold mb-6 underline">
							Welcome to Courtown BMX
						</h2>
						<div className="space-y-4">
							<p>
								Courtown BMX Club was established in 2016 and, since then, has
								provided an informal and friendly atmosphere for riders and
								families alike.
							</p>
							<p>
								At Courtown BMX we are all-inclusive and encourage people of all
								ages and from all backgrounds to try out a fun, exciting outdoor
								pursuit, whether it be for leisure, socialising or competitive
								sport.
							</p>
							<p>
								Why not pop down to our track at Riverchapel Community Complex
								and try it out?!
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
