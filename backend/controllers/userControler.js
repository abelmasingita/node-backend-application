import express from 'express'
import { User } from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const userLogin = async (req, res) => {
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
    })
  } else {
    res.status(401)
    throw new Error('User name or Password is Invalid')
  }
}

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password')

  if (users) {
    res.status(200).json(users)
  }
}

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.status(200).json(user)
  }
}

export { getAllUsers, getUserById, userLogin }
