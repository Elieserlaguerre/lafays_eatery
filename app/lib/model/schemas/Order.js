import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const orderSchema = new Schema(
	{
		products: {
			type: [
				{
					product: {
						type: ObjectId,
						ref: "Product"
					},
					priceCents: {
						type: Number
					},
					quantity: {
						type: Number
					}
				}
			],
			required: true,
			default: []
		},
		subtotalCents: {
			type: Number,
			required: true,
			default: 0
		},
		taxesCents: {
			type: Number,
			required: true,
			default: 0
		},
		totalCents: {
			type: Number,
			required: true,
			default: 0
		},
		customer: {
			type: ObjectId,
			ref: "Customer"
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Order"
		},
		status: {
			type: String,
			trim: true,
			enum: ["pending", "paid", "being prepaired", "shipped", "delivered"],
			default: "pending"
		},
		promotion: {
			type: ObjectId,
			ref: "Promotion"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
