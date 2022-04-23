import express from 'express'
import { Product } from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(404)
    throw new Error('Products not found!')
  }
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    image,
    rating,
    numReviews,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.rating = rating
    product.numReviews = numReviews
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, brand, image } = req.body

  try {
    const product = await Product.create({
      name: name,
      description: description,
      price: price,
      category: category,
      brand: brand,
      image: image,
      user: req.user.id,
    })

    if (product) {
      res.status(201)
      res.json(product)
    } else {
      throw new Error('product not created!')
    }
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
})
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: req.params.id })

    res.status(200).json(`Product Deleted!`)
  } else {
    res.status(404)
    throw new Error('Product Not Found!')
  }
})
export {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
}
