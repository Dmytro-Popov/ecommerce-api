import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export const Product = model('Product', productSchema);