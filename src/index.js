import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import { router } from './routes'
import { db } from './utils'

dotenv.config()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

const app = express()
app.disable('x-powered-by')
app.use(urlencoded({ extended: true }))
app.use('/', router)
const start = async () => {
  await db.connect(MONGO_URI).then(() => {
    console.log('connected')
    app.listen(PORT, () => console.log(`listening on: ${PORT}`))
  })
}

start()
