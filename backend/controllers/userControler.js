import express from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    //NOT DONE YET, MUST MATCH PASSWORD
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      password: 'Password not verified',
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
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.status(200).json(user)
  }
})
//

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const existUser = await User.findOne({ email })

  if (existUser) {
    res.status(401)
    throw new Error('User Already Exist')
  } else {
    const user = {
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    }

    const createdUser = await User.create(user)

    res.status(201).json({
      name: createdUser.name,
      email: createdUser.email,
    })
  }
})

export { getAllUsers, getUserById, userLogin, createUser }
