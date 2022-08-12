import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'
import { db } from './utils'

dotenv.config()
const PORT = process.env.PORT || 80
const mongo_uri = process.env.MONGO_URI
console.log(mongo_uri)
//
const corsOptions = { origin: '*' }

const app = express()
app.use(cors(corsOptions))
app.disable('x-powered-by')
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)
const start = async () => {
  await db.connect(mongo_uri).then(() => {
    console.log('connected')
    app.listen(PORT, () => console.log(`listening on: ${PORT}`))
  })
}

start()
