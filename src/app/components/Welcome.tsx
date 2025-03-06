import Image from "next/image";

export default function Welcome() {
	return (
		<section className="py-16 bg-stone-50 dark:bg-stone-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div className="flex justify-center">
						<div className="w-64 h-64 rounded-full overflow-hidden bg-white dark:bg-stone-800 flex items-center justify-center shadow-lg">
							<Image
								src={`/images/logo.png`}
								alt="Courtown BMX Logo"
								width={300}
								height={300}
								className="object-contain"
							/>
						</div>
					</div>
					<div className="text-stone-900 dark:text-stone-100">
						<h2 className="text-3xl font-bold mb-6 underline">
							Welcome to Courtown BMX
						</h2>
						<div className="space-y-4">
							<p>
								Established in 2016, Courtown BMX Club is the home of BMX in the
								sunny south east, offering sessions to excite and include
								everyone from toddlers to talls and get as many bums on bikes as
								we can.
							</p>
							<p>
								Located in Riverchapel Community Complex, feel free to pop down
								and enjoy a ride.
							</p>
							<p>All ages, sizes and skill levels are welcome.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
