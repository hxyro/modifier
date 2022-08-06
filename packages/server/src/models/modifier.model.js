import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}
const reqNumber = {
  type: Number,
  default: 0,
}

const modifierSchema = new mongoose.Schema(
  {
    user_name: reqString,
    modifier_name: reqString,
    redirect_url: reqString,
    asset_url: reqString,
    title: reqString,
    description: reqString,
    clicks: reqNumber,
  },
  { timestamps: true }
)

const modifier = mongoose.model('modifier', modifierSchema)

export default modifier
