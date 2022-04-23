import express from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('User name or Password is Invalid')
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')

  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw new Error('Users Not Found!')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found!')
  }
})
const deleteUserProile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    await User.deleteOne({ _id: req.params.id })

    res.status(200).json(`User Deleted!`)
  } else {
    res.status(404)
    throw new Error('User Not Found!')
  }
})
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found!')
  }
})
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  let user = await User.findById(req.params.id).select('-password')

  if (user) {
    user = {
      name: name,
      password: bcrypt.hashSync(password, 10),
    }
    await User.updateOne(user).select('-password')

    res.json('Updated')
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const existUser = await User.findOne({ email })

  if (existUser) {
    throw new Error('User Already Exist')
  } else {
    const user = {
      name: name,
      email: email,
      password: password,
    }

    const createdUser = await User.create(user)

    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    })
  }
})

export {
  getAllUsers,
  getUserById,
  userLogin,
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProile,
}
