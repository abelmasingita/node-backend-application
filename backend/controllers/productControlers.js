import express from 'express'
import { Product } from '../models/productModel.js'

const getProducts = async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.status(200).json(products)
  }
}

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  }
}

export { getProductById, getProducts }
