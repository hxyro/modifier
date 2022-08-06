import mongoose from 'mongoose'

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export default connect
