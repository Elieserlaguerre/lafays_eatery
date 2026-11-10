import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function OurStory() {
	const categories = [
		{
			name: "Haitian cuisine",
			description: "Bold seasoning, vibrant flavors, and beloved dishes inspired by Haiti's rich culinary heritage."
		},
		{
			name: "Jamaican Cuisine",
			description: "A celebration of distinctive spices, island-inspired flavors, and unforgettable comfort food."
		},
		{
			name: "Black American Soul Food",
			description: "Comforting classics, rich traditions, and the kind of cooking that brings people home."
		},
		{
			name: "More to Discover",
			description: "Explore our selection of pastries, beverages, specialties, and other delicious creations."
		}
	];
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
					<div className="col-span-2">
						<p className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">More Than a Meal. It's a Labor of Love.</p>
						<p className="mt-6 text-base/7 text-gray-700">At Lafay's Eatery, great food begins with a genuine love for the craft. Inspired by the rich culinary traditions of different cultures, our kitchen brings together an appreciation for bold flavors, treasured recipes, and the little details that make every dish special. From the vibrant spices of Haitian and Jamaican cuisine to the comforting familiarity of Black American Soul Food, each culinary tradition offers something worth celebrating.</p>
						<p className="mt-6 text-base/7 text-gray-700">Our approach is simple: learn, appreciate, create, and serve with care. Every dish is an opportunity to share that passion with the people around us.</p>
					</div>
					<dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
						{categories.map((category) => (
							<div key={category.name} className="relative pl-9">
								<dt className="font-semibold text-gray-900">
									<CheckIcon aria-hidden="true" className="absolute top-1 left-0 size-5 text-indigo-500" />
									{category.name}
								</dt>
								<dd className="mt-2">{category.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
