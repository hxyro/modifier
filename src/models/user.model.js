import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
  unique: true,
}

const userSchema = new mongoose.Schema(
  {
    name: reqString,
    modifier: [{ type: mongoose.Schema.Types.ObjectId, ref: 'modifier' }],
  },
  { timestamps: true }
)

const user = mongoose.model('user', userSchema)

export default user
