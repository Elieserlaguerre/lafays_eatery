import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const customerSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			trim: true,
			required: true
		},
		phone: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		password: {
			type: String,
			trim: true,
			required: true
		},
		image: {
			publicId: {
				type: String,
				trim: true
			},
			url: {
				type: String,
				trim: true
			},
			width: {
				type: Number
			},
			height: {
				type: Number
			}
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Customer"
		},
		address: {
			type: String,
			trim: true
		},
		address2: {
			type: String,
			trim: true
		},
		city: {
			type: String,
			trim: true
		},
		state: {
			type: String,
			trim: true
		},
		zipCode: {
			type: Number
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);
