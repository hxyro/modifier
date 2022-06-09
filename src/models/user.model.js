import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

const userSchema = new mongoose.Schema(
  {
    name: reqString,
    modifier: [{ type: mongoose.Schema.Types.ObjectId, ref: 'modifier' }],
  },
  { timestamps: true }
)

export const user = mongoose.model('user', userSchema)
