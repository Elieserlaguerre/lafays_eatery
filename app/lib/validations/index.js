import z from "zod";

export const userRegistration = z
	.object({
		firstName: z.string().trim().nonempty({ error: "first name is required." }),
		lastName: z.string().trim().nonempty({ error: "last name is required." }),
		email: z.email({ error: "please provide a valid email." }),
		phone: z.string().trim().nonempty({ error: "phone number is required." }),
		password: z.string().trim().nonempty({ error: "password is required." }),
		confirmPassword: z.string().trim().nonempty({ error: "password must be confirmed." })
	})
	.refine((data) => data.password === data.confirmPassword, { error: "password must match.", path: ["confirmPassword"] });

export const loginValidation = z.object({
	email: z.string().trim().nonempty({ error: "email is required." }),
	password: z.string().trim().nonempty({ error: "password is required." })
});
