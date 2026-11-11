import { Schema, model } from 'mongoose'
import { normalize } from './normalize.js'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        normalize(doc, ret)
        const { password, ...user } = ret
        return ret
      },
    },
  },
)

export const User = model('User', userSchema)
