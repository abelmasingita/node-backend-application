import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const { Schema, model, timestamps } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.comparePasswords = async function (pass) {
  console.log(pass)
  return await bcrypt.compare(pass, this.password)
}
export const User = model('User', userSchema)
