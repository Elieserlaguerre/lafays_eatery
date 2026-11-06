import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const promotionSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String,
			trim: true,
			required: true
		},
		products: {
			type: [
				{
					type: ObjectId,
					ref: "Product"
				}
			],
			default: []
		},
		priceCents: {
			type: Number,
			required: true,
			default: 0
		},
		banner: {
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
			},
			required: true
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Promotion"
		},
		startDate: {
			type: Date,
			required: true
		},
		endDate: {
			type: Date,
			required: true
		},
		code: {
			type: String,
			trim: true,
			required: true
		},
		banner: {
			publicId: {
				type: String,
				trim: true
			},
			url: {
				type: String,
				trim: true
			},
			width: {
				type: Number,
				default: 300
			},
			Height: {
				type: Number,
				default: 300
			}
		},
		category: {
			type: ObjectId,
			ref: "Category"
		},
		subcategory: {
			type: ObjectId,
			ref: "Subcategory"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Promotion || mongoose.model("Promotion", promotionSchema);
