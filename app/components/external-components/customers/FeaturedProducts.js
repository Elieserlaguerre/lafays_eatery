import React, { Fragment } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import entray1 from "../../../../public/images/customers/home-page/entray_1.jpg";
import entray2 from "../../../../public/images/customers/home-page/entray_2.jpg";
import entray3 from "../../../../public/images/customers/home-page/entray_3.jpg";
import entray4 from "../../../../public/images/customers/home-page/entray_4.jpg";
import Image from "next/image";

const product = {
	name: "Zip Tote Basket",
	price: "$140",
	rating: 4,
	images: [
		{
			id: 1,
			name: "Angled view",
			src: entray1,
			alt: "Angled front view with bag zipped and handles upright."
		},
		{
			id: 2,
			name: "Front view",
			src: entray2,
			alt: "Front view with bag zipped and handles upright."
		},
		{
			id: 3,
			name: "Back view",
			src: entray3,
			alt: "Back view with bag zipped and straps hanging down."
		},
		{
			id: 4,
			name: "Back angle open view",
			src: entray4,
			alt: "Back angled view with bag open and handles to the side."
		}
	],
	colors: [
		{ id: "washed-black", name: "Washed Black", classes: "bg-gray-700 checked:outline-gray-700" },
		{ id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
		{ id: "washed-gray", name: "Washed Gray", classes: "bg-gray-500 checked:outline-gray-500" }
	],
	description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
	details: [
		{
			name: "Features",
			items: ["Multiple strap configurations", "Spacious interior with top zip", "Leather handle and tabs", "Interior dividers", "Stainless strap loops", "Double stitched construction", "Water-resistant"]
		},

		{
			name: "Shipping",
			items: ["Free shipping on orders over $300", "International shipping available", "Expedited shipping options", "Signature required upon delivery"]
		},
		{
			name: "Returns",
			items: ["Easy return requests", "Pre-paid shipping label included", "10% restocking fee for returns", "60 day return window"]
		}
	]
};

const reviews = {
	average: 4,
	featured: [
		{
			id: 1,
			rating: 5,
			content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
			date: "July 16, 2021",
			datetime: "2021-07-16",
			author: "Emily Selman",
			avatarSrc: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
		},
		{
			id: 2,
			rating: 5,
			content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
			date: "July 12, 2021",
			datetime: "2021-07-12",
			author: "Hector Gibbons",
			avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
		},
		{
			id: 3,
			rating: 4,
			content: `
        <p>Really happy with look and options of these icons. I've found uses for them everywhere in my recent projects. I hope there will be 20px versions in the future!</p>
      `,
			date: "July 6, 2021",
			datetime: "2021-07-06",
			author: "Mark Edwards",
			avatarSrc: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		}
	]
};
const faqs = [
	{
		question: "What format are these icons?",
		answer: "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code."
	},
	{
		question: "Can I use the icons at different sizes?",
		answer: "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance."
	},
	{
		question: "Do I have to add attribution to my projects?",
		answer: "No. You are allowed to use these icons freely in your personal and professional work. If you enjoy the icon pack, feel free to tell others!"
	}
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function FeaturedProducts() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="mx-auto max-w-2xl text-center mb-5">
					<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl capitalize">featured products</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">Discover customer favorites, explore new flavors, and find something delicious for your next meal or gathering.</p>
				</div>
				<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
					{/* Image gallery */}
					<TabGroup className="flex flex-col-reverse">
						{/* Image selector */}
						<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
							<TabList className="grid grid-cols-4 gap-6">
								{product.images.map((image) => (
									<Tab key={image.id} className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden">
										<span className="sr-only">{image.name}</span>
										<span className="absolute inset-0 overflow-hidden rounded-md">
											<Image alt="" src={image.src} className="size-full object-cover" />
										</span>
										<span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500" />
									</Tab>
								))}
							</TabList>
						</div>

						<TabPanels>
							{product.images.map((image) => (
								<TabPanel key={image.id}>
									<Image alt={image.alt} src={image.src} className="aspect-square w-full object-cover sm:rounded-lg" />
								</TabPanel>
							))}
						</TabPanels>
					</TabGroup>

					{/* Product info */}
					<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
						<TabGroup>
							<div className="border-b border-gray-200">
								<TabList className="-mb-px flex space-x-8">
									<Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">Product details</Tab>
									<Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">Customer Reviews</Tab>
									<Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">FAQ</Tab>
								</TabList>
							</div>
							<TabPanels as={Fragment}>
								<TabPanel className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-5">
									<h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

									<div className="mt-3">
										<h2 className="sr-only">Product information</h2>
										<p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
									</div>

									{/* Reviews */}
									<div className="mt-3">
										<h3 className="sr-only">Reviews</h3>
										<div className="flex items-center">
											<div className="flex items-center">
												{[0, 1, 2, 3, 4].map((rating) => (
													<StarIcon key={rating} aria-hidden="true" className={classNames(product.rating > rating ? "text-indigo-500" : "text-gray-300", "size-5 shrink-0")} />
												))}
											</div>
											<p className="sr-only">{product.rating} out of 5 stars</p>
										</div>
									</div>

									<div className="mt-6">
										<h3 className="sr-only">Description</h3>

										<div dangerouslySetInnerHTML={{ __html: product.description }} className="space-y-6 text-base text-gray-700" />
									</div>

									<form className="mt-6">
										{/* Colors */}
										<div>
											<h3 className="text-sm font-medium text-gray-600">Color</h3>

											<fieldset aria-label="Choose a color" className="mt-2">
												<div className="flex items-center gap-x-3">
													{product.colors.map((color) => (
														<div key={color.id} className="flex rounded-full outline -outline-offset-1 outline-black/10">
															<input defaultValue={color.id} defaultChecked={color === product.colors[0]} name="color" type="radio" aria-label={color.name} className={classNames(color.classes, "size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3")} />
														</div>
													))}
												</div>
											</fieldset>
										</div>

										{/* <div className="mt-10 flex">
											<button type="submit" className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden sm:w-full">
												Add to bag
											</button>

											<button type="button" className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
												<HeartIcon aria-hidden="true" className="size-6 shrink-0" />
												<span className="sr-only">Add to favorites</span>
											</button>
										</div> */}
									</form>

									<section aria-labelledby="details-heading" className="mt-12">
										<h2 id="details-heading" className="sr-only">
											Additional details
										</h2>

										<div className="divide-y divide-gray-200 border-t border-gray-200">
											{product.details.map((detail) => (
												<Disclosure key={detail.name} as="div">
													<h3>
														<DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
															<span className="text-sm font-medium text-gray-900 group-data-open:text-indigo-600">{detail.name}</span>
															<span className="ml-6 flex items-center">
																<PlusIcon aria-hidden="true" className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-open:hidden" />
																<MinusIcon aria-hidden="true" className="hidden size-6 text-indigo-400 group-hover:text-indigo-500 group-data-open:block" />
															</span>
														</DisclosureButton>
													</h3>
													<DisclosurePanel className="pb-6">
														<ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
															{detail.items.map((item) => (
																<li key={item} className="pl-2">
																	{item}
																</li>
															))}
														</ul>
													</DisclosurePanel>
												</Disclosure>
											))}
										</div>
									</section>
								</TabPanel>

								<TabPanel className="-mb-10">
									<h3 className="sr-only">Customer Reviews</h3>

									{reviews.featured.map((review, reviewIdx) => (
										<div key={review.id} className="flex space-x-4 text-sm text-gray-500">
											<div className="flex-none py-10">
												<img alt="" src={review.avatarSrc} className="size-10 rounded-full bg-gray-100" />
											</div>
											<div className={classNames(reviewIdx === 0 ? "" : "border-t border-gray-200", "py-10")}>
												<h3 className="font-medium text-gray-900">{review.author}</h3>
												<p>
													<time dateTime={review.datetime}>{review.date}</time>
												</p>

												<div className="mt-4 flex items-center">
													{[0, 1, 2, 3, 4].map((rating) => (
														<StarIcon key={rating} aria-hidden="true" className={classNames(review.rating > rating ? "text-yellow-400" : "text-gray-300", "size-5 shrink-0")} />
													))}
												</div>
												<p className="sr-only">{review.rating} out of 5 stars</p>

												<div dangerouslySetInnerHTML={{ __html: review.content }} className="mt-4 text-sm/6 text-gray-500" />
											</div>
										</div>
									))}
								</TabPanel>

								<TabPanel className="text-sm text-gray-500">
									<h3 className="sr-only">Frequently Asked Questions</h3>

									<dl>
										{faqs.map((faq) => (
											<Fragment key={faq.question}>
												<dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
												<dd className="mt-2 text-sm/6 text-gray-500">
													<p>{faq.answer}</p>
												</dd>
											</Fragment>
										))}
									</dl>
								</TabPanel>
							</TabPanels>
						</TabGroup>
					</div>
				</div>
			</div>
		</div>
	);
}
