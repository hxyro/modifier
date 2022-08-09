import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'
import { db } from './utils'

dotenv.config()
const PORT = process.env.PORT || 5000
//
const corsOptions = { origin: '*' }

const app = express()
app.use(cors(corsOptions))
app.disable('x-powered-by')
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)
const start = async () => {
  await db.connect('mongodb://mongodb:27017/').then(() => {
    console.log('connected')
    app.listen(PORT, () => console.log(`listening on: ${PORT}`))
  })
}

start()
