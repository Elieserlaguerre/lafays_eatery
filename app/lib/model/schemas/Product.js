import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		description: {
			type: String,
			trim: true,
			required: true
		},
		slug: {
			type: String,
			trim: true,
			required: true
		},
		colors: {
			available: {
				type: Boolean,
				default: false
			},
			set: {
				type: [
					{
						name: {
							type: String,
							trim: true
						},
						value: {
							type: String,
							trim: true
						}
					}
				],
				default: []
			}
		},
		details: {
			type: [
				{
					name: {
						type: String,
						trim: true
					},
					list: {
						type: [
							{
								type: String,
								trim: true
							}
						]
					}
				}
			],
			default: []
		},
		images: {
			type: [
				{
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
				}
			],
			default: []
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Product"
		},
		category: {
			type: ObjectId,
			ref: "Category"
		},
		subcategory: {
			type: ObjectId,
			ref: "Subcategory"
		},
		stock: {
			type: Number,
			default: 0
		},
		status: {
			type: String,
			trim: true,
			emum: ["available", "unavailable"]
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
			Height: {
				type: Number
			}
		},
		owner: {
			type: ObjectId,
			ref: "Admin"
		},
		featured: {
			type: Boolean,
			required: true,
			default: false
		},
		reviews: {
			ratingAverage: {
				type: Number,
				default: 0
			},
			totalCount: {
				type: Number,
				default: 0
			},
			totalSum: {
				type: Number,
				default: 0
			},
			breakDown: [
				{
					rating: {
						type: Number,
						default: 5
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 4
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 3
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 2
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 1
					},
					count: {
						type: Number,
						default: 0
					}
				}
			],
			featuredComments: [
				{
					type: ObjectId,
					ref: "Review"
				}
			]
		},
		faqs: {
			type: [
				{
					question: {
						type: String,
						trim: true
					},
					answer: {
						type: String,
						trim: true
					}
				}
			],
			default: []
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
