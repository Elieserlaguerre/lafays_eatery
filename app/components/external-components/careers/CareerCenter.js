"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/20/solid";

const sortOptions = [
	{ name: "Most Popular", href: "#", current: true },
	{ name: "Best Rating", href: "#", current: false },
	{ name: "Newest", href: "#", current: false },
	{ name: "Price: Low to High", href: "#", current: false },
	{ name: "Price: High to Low", href: "#", current: false }
];
const subCategories = [
	{ name: "Totes", href: "#" },
	{ name: "Backpacks", href: "#" },
	{ name: "Travel Bags", href: "#" },
	{ name: "Hip Bags", href: "#" },
	{ name: "Laptop Sleeves", href: "#" }
];
const filters = [
	{
		id: "color",
		name: "Color",
		options: [
			{ value: "white", label: "White", checked: false },
			{ value: "beige", label: "Beige", checked: false },
			{ value: "blue", label: "Blue", checked: true },
			{ value: "brown", label: "Brown", checked: false },
			{ value: "green", label: "Green", checked: false },
			{ value: "purple", label: "Purple", checked: false }
		]
	},
	{
		id: "category",
		name: "Category",
		options: [
			{ value: "new-arrivals", label: "New Arrivals", checked: false },
			{ value: "sale", label: "Sale", checked: false },
			{ value: "travel", label: "Travel", checked: true },
			{ value: "organization", label: "Organization", checked: false },
			{ value: "accessories", label: "Accessories", checked: false }
		]
	},
	{
		id: "size",
		name: "Size",
		options: [
			{ value: "2l", label: "2L", checked: false },
			{ value: "6l", label: "6L", checked: false },
			{ value: "12l", label: "12L", checked: false },
			{ value: "18l", label: "18L", checked: false },
			{ value: "20l", label: "20L", checked: false },
			{ value: "40l", label: "40L", checked: true }
		]
	}
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function CareerCenter({ children }) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	return (
		<div className="bg-white">
			<div className="pt-12">
				<div className="overflow-hidden pt-32 sm:pt-14">
					<div className="hidden sm:flex justify-start items-center gap-2 mx-auto max-w-11/12 xl:max-w-10/12 p-4 sm:px-6 lg:px-8 ">
						<div className="size-8 rounded-md">
							<img alt="" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="size-full" />
						</div>
						<h1 className="text-lg text-gray-700 capitalize">lafay's eatery</h1>
					</div>
					<div className="bg-gray-800 ">
						<div className="mx-auto max-w-11/12 xl:max-w-10/12 px-4 sm:px-6 lg:px-8">
							<div className="relative pt-48 pb-16 sm:pb-24">
								<div>
									<h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl capitalize">
										careers
									</h2>
									<p className="mt-4 text-lg font-medium text-wrap w-full md:max-w-8/12 xl:text-pretty text-white sm:text-xl/8 ">Anim aute id magna aliqua ad ad non deserunt sunt. </p>
									<div className="mt-6 text-base">
										<form className="mt-5 sm:flex sm:items-center">
											<div className="w-full sm:max-w-xs">
												<input id="email" name="email" type="email" placeholder="Job search" aria-label="Email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
											</div>
											<button type="submit" className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto">
												<MagnifyingGlassIcon className="size-5" />
											</button>
										</form>
									</div>
								</div>

								<div className="absolute -top-32 left-1/2 min-w-max -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
									<div className="ml-24 flex space-x-6 md:ml-36 lg:ml-20 xl:ml-3 lg:space-x-8">
										<div className="flex space-x-6 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
											<div className="shrink-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
										</div>
										<div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
											<div className="shrink-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
										</div>
										<div className="flex space-x-6 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
											<div className="shrink-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>

											<div className="mt-6 shrink-0 sm:mt-0">
												<img alt="" src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg" className="size-64 rounded-lg object-cover md:size-72" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-screen">
				{/* Mobile filter dialog */}
				<Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
					<DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

					<div className="fixed inset-0 z-40 flex">
						<DialogPanel transition className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
							<div className="flex items-center justify-between px-4">
								<h2 className="text-lg font-medium text-gray-900">Filters</h2>
								<button type="button" onClick={() => setMobileFiltersOpen(false)} className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Close menu</span>
									<XMarkIcon aria-hidden="true" className="size-6" />
								</button>
							</div>

							{/* Filters */}
							<form className="mt-4 border-t border-gray-200">
								<h3 className="sr-only">Categories</h3>
								<ul role="list" className="px-2 py-3 font-medium text-gray-900">
									{subCategories.map((category) => (
										<li key={category.name}>
											<a href={category.href} className="block px-2 py-3">
												{category.name}
											</a>
										</li>
									))}
								</ul>

								{filters.map((section) => (
									<Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
										<h3 className="-mx-2 -my-3 flow-root">
											<DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
												<span className="font-medium text-gray-900">{section.name}</span>
												<span className="ml-6 flex items-center">
													<PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
													<MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
												</span>
											</DisclosureButton>
										</h3>
										<DisclosurePanel className="pt-6">
											<div className="space-y-6">
												{section.options.map((option, optionIdx) => (
													<div key={option.value} className="flex gap-3">
														<div className="flex h-5 shrink-0 items-center">
															<div className="group grid size-4 grid-cols-1">
																<input defaultValue={option.value} id={`filter-mobile-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
																<svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
																	<path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
																	<path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
																</svg>
															</div>
														</div>
														<label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="min-w-0 flex-1 text-gray-500">
															{option.label}
														</label>
													</div>
												))}
											</div>
										</DisclosurePanel>
									</Disclosure>
								))}
							</form>
						</DialogPanel>
					</div>
				</Dialog>

				<main className="mx-auto max-w-11/12 xl:max-w-10/12 px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-center lg:justify-between border-b border-gray-200 pt-12 pb-6">
						<h1 className="hidden lg:inline-block text-3xl font-bold tracking-tight text-gray-900 capitalize">job categories</h1>

						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
									Sort
									<ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
								</MenuButton>

								<MenuItems transition className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
									<div className="py-1">
										{sortOptions.map((option) => (
											<MenuItem key={option.name}>
												<a href={option.href} className={classNames(option.current ? "font-medium text-gray-900" : "text-gray-500", "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden")}>
													{option.name}
												</a>
											</MenuItem>
										))}
									</div>
								</MenuItems>
							</Menu>

							<button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
								<span className="sr-only">View grid</span>
								<Squares2X2Icon aria-hidden="true" className="size-5" />
							</button>
							<button type="button" onClick={() => setMobileFiltersOpen(true)} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
								<span className="sr-only">Filters</span>
								<FunnelIcon aria-hidden="true" className="size-5" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pt-6 pb-24">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
							{/* Filters */}
							<form className="hidden lg:block">
								<h3 className="sr-only">Categories</h3>
								<ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
									{subCategories.map((category) => (
										<li key={category.name}>
											<a href={category.href}>{category.name}</a>
										</li>
									))}
								</ul>

								{filters.map((section) => (
									<Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
										<h3 className="-my-3 flow-root">
											<DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
												<span className="font-medium text-gray-900">{section.name}</span>
												<span className="ml-6 flex items-center">
													<PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
													<MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
												</span>
											</DisclosureButton>
										</h3>
										<DisclosurePanel className="pt-6">
											<div className="space-y-4">
												{section.options.map((option, optionIdx) => (
													<div key={option.value} className="flex gap-3">
														<div className="flex h-5 shrink-0 items-center">
															<div className="group grid size-4 grid-cols-1">
																<input defaultValue={option.value} defaultChecked={option.checked} id={`filter-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
																<svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
																	<path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
																	<path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
																</svg>
															</div>
														</div>
														<label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
															{option.label}
														</label>
													</div>
												))}
											</div>
										</DisclosurePanel>
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className="col-span-3 xl:col-span-4">{children}</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
