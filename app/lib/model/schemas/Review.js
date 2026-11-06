import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reviewSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true
		},
		rating: {
			type: String,
			trim: true,
			required: true
		},
		comment: {
			type: String,
			trim: true,
			required: true
		},
		customer: {
			type: ObjectId,
			ref: "Customer",
			required: true
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Review"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
