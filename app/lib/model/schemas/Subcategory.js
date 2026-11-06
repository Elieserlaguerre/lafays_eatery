import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const subcategorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		slug: {
			type: String,
			trim: true,
			required: true
		},
		parentCategory: {
			type: ObjectId,
			ref: "Category"
		},
		creator: {
			type: ObjectId,
			ref: "Admin"
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
			}
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Subcategory"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);
