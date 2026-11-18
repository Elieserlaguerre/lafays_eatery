"use client";
import Link from "next/link";
import React from "react";

export default function SupportCenter() {
	return (
		<div className="h-full">
			<header className="bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-base/7 font-semibold text-indigo-600">Get the help you need</p>
					<h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Support center</h2>
					<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.</p>
				</div>
			</header>

			<div className="bg-white py-8 sm:py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
							<div>
								<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900">Get in touch</h2>
								<p className="mt-4 text-base/7 text-gray-600">Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.</p>
							</div>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900 capitalize">email support</h3>
									<dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
										<div>
											<dt className="sr-only">Email support</dt>
											<dd>
												<a href="mailto:support@layfayseatery.com" className="font-semibold text-indigo-600">
													support@layfayseatery.com
												</a>
											</dd>
										</div>
									</dl>
								</div>
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">Press</h3>
									<dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
										<div>
											<dt className="sr-only">Email</dt>
											<dd>
												<a href="mailto:press@layfayseatery.com" className="font-semibold text-indigo-600">
													press@layfayseatery.com
												</a>
											</dd>
										</div>
										<div className="mt-1">
											<dt className="sr-only">Phone number</dt>
											<dd>+1 (555) 905-3456</dd>
										</div>
									</dl>
								</div>
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">Join our team</h3>
									<dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
										<div>
											<dt className="sr-only">Email</dt>
											<dd>
												<a href="mailto:careers@layfayseatery.com" className="font-semibold text-indigo-600">
													careers@layfayseatery.com
												</a>
											</dd>
										</div>
										<div className="mt-1">
											<dt className="sr-only">view career</dt>
											<dd>
												<Link href={process.env.NEXT_PUBLIC_CAREERS_SUBDOMAIN} className="capitalize cursor-pointer hover:text-indigo-600">
													view jobs
												</Link>
											</dd>
										</div>
									</dl>
								</div>
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">Say hello</h3>
									<dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
										<div>
											<dt className="sr-only">Email</dt>
											<dd>
												<a href="mailto:hello@layfayseatery.com" className="font-semibold text-indigo-600">
													hello@layfayseatery.com
												</a>
											</dd>
										</div>
										<div className="mt-1">
											<dt className="sr-only">Phone number</dt>
											<dd>+1 (555) 905-5678</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
							<div>
								<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900">Locations</h2>
								<p className="mt-4 text-base/7 text-gray-600">Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum commodo.</p>
							</div>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">Los Angeles</h3>
									<address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
										<p>4556 Brendan Ferry</p>
										<p>Los Angeles, CA 90210</p>
									</address>
								</div>
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">New York</h3>
									<address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
										<p>886 Walter Street</p>
										<p>New York, NY 12345</p>
									</address>
								</div>
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">Toronto</h3>
									<address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
										<p>7363 Cynthia Pass</p>
										<p>Toronto, ON N3Y 4H8</p>
									</address>
								</div>
								<div className="rounded-2xl bg-gray-50 p-10">
									<h3 className="text-base/7 font-semibold text-gray-900">Chicago</h3>
									<address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
										<p>726 Mavis Island</p>
										<p>Chicago, IL 60601</p>
									</address>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
