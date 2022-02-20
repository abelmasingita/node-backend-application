import { User } from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import jwt_decode from 'jwt-decode'

export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[2]

      const decoded = jwt_decode(token)

      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, token not provided')
  }
})

export const admin = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Do not have neccessary Permission')
  }
})