import React from "react";

export default function CallToAction() {
	return (
		<div className="bg-white">
			<div className="px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Ready to dive in?</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">Whether you're craving a familiar favorite or ready to explore something new, there's a place for you at Lafay's Eatery. Let's Make Your Next Meal Special.</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<button href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize">
							create an account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
