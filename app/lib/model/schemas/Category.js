import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const CategorySchema = new Schema(
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
		creator: {
			type: ObjectId,
			ref: "Admin",
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
				type: Number,
				default: 300
			},
			height: {
				type: Number,
				default: 300
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
				type: Number,
				default: 300
			},
			height: {
				type: Number,
				default: 300
			}
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Category"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
