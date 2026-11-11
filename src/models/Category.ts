import { Schema, model } from 'mongoose'
import { normalize } from './normalize.js'

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { toJSON: { transform: normalize } },
)

export const Category = model('Category', categorySchema)
