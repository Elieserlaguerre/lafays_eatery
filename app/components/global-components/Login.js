"use client";
import { currentDomain, openLogin } from "@/app/lib/state-management/section/global";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../shadcn/button";
import { loginValidation } from "@/app/lib/validations";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { useLazyUserLoginQuery } from "@/app/lib/redux/data-fetching/global-api";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
	const [open, setOpen] = useAtom(openLogin);

	const closingFunction = () => {
		setOpen(false);
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const domain = useAtomValue(currentDomain);

	const [formContent, setFormContent] = useState({
		email: "",
		password: ""
	});

	const clearForm = () => {
		setFormContent({
			email: "",
			password: ""
		});
	};

	const handleChanges = ({ target }) => {
		const { name, value } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const router = useRouter();

    async function initiateLogin (verifiedUser) {
        
		const login = await signIn("credentials", { email: verifiedUser.email, password: verifiedUser.password, domain, redirect: false });

		if (login.ok) {
			toast.success("login successful.");

			router.push("/dashboard");
		} else {
			toast.error("Login failed. Check your username or password then try again!");
		}
	}

	const [login, loginResults] = useLazyUserLoginQuery();

	useEffect(() => {
		if (loginResults.isError) {
			const message = typeof loginResults.error === "string" ? loginResults.error : loginResults.error.message;
			toast.error(message);
		} else if (loginResults.isSuccess) {
			toast.success(loginResults.data.message);

			const { results } = loginResults.data;
			initiateLogin(results);
			// clearForm();
			// closingFunction();
		}
	}, [loginResults.isFetching, loginResults.isSuccess, loginResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = loginValidation.safeParse(formContent);

		if (validation.success) {
			login({ ...validation.data, domain });
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-50">
			<div className="fixed inset-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 top-0 right-0 flex max-w-md xl:pl-16">
						<DialogPanel transition className="pointer-events-auto w-screen xl:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
							<form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div className="flex-1 flex flex-col overflow-y-hidden max-h-screen">
									<div className={classNames("px-4 py-[1.61rem] sm:px-6 bg-linear-to-br from-orange-500 to-orange-700")}>
										<div className="flex items-center justify-between">
											<DialogTitle className="font-semibold text-white capitalize text-3xl tracking-tight w-full text-center">lafay's eatery</DialogTitle>
											<div className="ml-3 flex h-7 items-center">
												<button type="button" onClick={closingFunction} className="relative rounded-md bg-transparent text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
													<span className="absolute -inset-2.5" />
													<span className="sr-only">Close panel</span>
													<XMarkIcon aria-hidden="true" className="text-white w-6 h-6" />
												</button>
											</div>
										</div>
									</div>
									<div className="px-4 sm:px-6 grow overflow-y-auto py-10">
										<div className="sm:mx-auto sm:w-full sm:max-w-sm py-4">
											<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="mx-auto h-10 w-auto" />
											<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
										</div>
										<div className="space-y-6 flex flex-col">
											<div>
												<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 capitalize">
													email
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="email" name="email" type="email" value={formContent?.email} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
											<div>
												<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 capitalize">
													password
												</label>
												<div className="mt-2">
													<input onChange={handleChanges} id="password" name="password" type="text" value={formContent?.password} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
												</div>
											</div>
										</div>

										<div>
											<div className="mt-10 flex items-center gap-x-6">
												<div className="w-full flex-1 border-t border-gray-200" />
												<p className="text-sm/6 font-medium text-nowrap text-gray-900">Or continue with</p>
												<div className="w-full flex-1 border-t border-gray-200" />
											</div>

											<div className="mt-6 grid grid-cols-1 gap-4">
												<a href="#" className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 focus-visible:inset-ring-transparent">
													<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
														<path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
														<path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
														<path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
														<path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
													</svg>
													<span className="text-sm/6 font-semibold">Google</span>
												</a>

												<a href="#" className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 focus-visible:inset-ring-transparent">
													<svg fill="currentColor" viewBox="0 0 24 24" className="size-7">
														<path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
													</svg>
													<span className="text-sm/6 font-semibold">Facebook</span>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="flex shrink-0 justify-evenly items-center px-4 py-4">
									<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
										{loginResults.isFetching ? (
											<>
												processing... <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
											</>
										) : (
											"submit"
										)}
									</button>
									<button type="button" onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
										Cancel
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
