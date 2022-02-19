import { User } from '../models/userModel.js'

export const admin = (req, res, next) => {
  if (!req.user) {
    next()
  } else {
    throw new Error('Do not have neccessary Permission')
    res.status(401)
  }
}

export const protect = (req, res, next) => {
  if (!req.user) {
    next()
  } else {
    throw new Error('No Authorized')
    res.status(401)
  }
}
