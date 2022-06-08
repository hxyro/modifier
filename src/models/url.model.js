import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    asset_url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

export default urlSchema
