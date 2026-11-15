"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../shadcn/button";
import { useAtom, useAtomValue } from "jotai";
import { currentDomain, openRegister } from "@/app/lib/state-management/section/global";
import { fromZodError } from "zod-validation-error";
import toast from "react-hot-toast";
import { userRegistration } from "@/app/lib/validations";
import { useUserRegistrationMutation } from "@/app/lib/redux/data-fetching/global-api";
import { Loader2 } from "lucide-react";

export default function Register() {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [open, setOpen] = useAtom(openRegister);

	const closingFunction = () => {
		setOpen(false);
	};

	const domain = useAtomValue(currentDomain);

	const [formContent, setFormContent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: ""
	});

	const clearForm = () => {
		setFormContent({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: ""
		});
	};

	const handleChanges = ({ target }) => {
		const { name, value } = target;
		setFormContent((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const [register, registerResults] = useUserRegistrationMutation();

	useEffect(() => {
		if (registerResults.isError) {
			const message = typeof registerResults.error === "string" ? registerResults.error : registerResults.error.message;
			toast.error(message);
		} else if (registerResults.isSuccess) {
			toast.success(registerResults.data.message);
			clearForm();
			closingFunction();
		}
	}, [registerResults.isLoading, registerResults.isSuccess, registerResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = userRegistration.safeParse(formContent);

		if (validation.success) {
			register({ user: validation.data, domain });
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-10">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">create account</h2>
						</div>
						<form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl" autoComplete="on">
							<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
								<div>
									<label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										First name
									</label>
									<div className="mt-2.5">
										<input onChange={handleChanges} value={formContent.firstName} type="text" name="firstName" id="firstName" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
								<div>
									<label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										Last name
									</label>
									<div className="mt-2.5">
										<input onChange={handleChanges} value={formContent.lastName} type="text" name="lastName" id="lastName" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="">
									<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										Email
									</label>
									<div className="mt-2.5">
										<input onChange={handleChanges} value={formContent.email} type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
								<div className="">
									<label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										Phone number
									</label>
									<div className="relative mt-2.5">
										<input onChange={handleChanges} value={formContent.phone} type="tel" name="phone" id="phone" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
								<div className="col-span-full">
									<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										password
									</label>
									<div className="mt-2.5">
										<input onChange={handleChanges} value={formContent.password} type="password" name="password" id="password" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
								<div className="col-span-full">
									<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 capitalize">
										confirm password
									</label>
									<div className="mt-2.5">
										<input onChange={handleChanges} value={formContent.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
							</div>
							<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
								<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
									{registerResults.isLoading ? (
										<>
											processing... <Loader2 className="w-5 h-auto animate-spin inline-block ml-3" />
										</>
									) : (
										"submit"
									)}
								</button>
								<button type="button" onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
									canel
								</button>
							</div>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
