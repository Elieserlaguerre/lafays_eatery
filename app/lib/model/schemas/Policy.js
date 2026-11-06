import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const policySchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true
		},
		content: {
			type: [
				{
					section: {
						type: String,
						trim: true
					},
					subsection: {
						type: String,
						trim: true
					},
					details: {
						type: String,
						trim: true
					}
				}
			],
			default: []
		},
		creator: {
			type: ObjectId,
			ref: "Admin"
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Policy"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Policy || mongoose.model("Policy", policySchema);
