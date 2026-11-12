import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reviewSchema = new Schema(
	{
		rating: {
			type: Number,
			required: true
		},
		comment: {
			type: String,
			trim: true,
			required: true
		},
		author: {
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
