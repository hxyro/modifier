import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    modifiers: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

export default userSchema
