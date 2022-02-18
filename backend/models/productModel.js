import mongoose from 'mongoose'

const { Schema, model } = mongoose

const reviewSchema = new Schema({
  rating: { type: String, required: false },
})

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: [reviewSchema],

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Product = model('Product', productSchema)
