import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}
const reqNumber = {
  type: Number,
  required: true,
  default: 0,
}

const modifierSchema = new mongoose.Schema(
  {
    owner: reqString,
    name: reqString,
    url: reqString,
    asset_url: reqString,
    title: reqString,
    description: reqString,
    clicks: reqNumber,
  },
  { timestamps: true }
)

export const modifier = mongoose.model('modifier', modifierSchema)
