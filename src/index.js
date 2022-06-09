import express, { urlencoded } from 'express'
import dotenv from 'dotenv'

import { router } from 'routes/users.js'

//import { model } from './models'
//model.user
//model.modifier

//import { db } from './utils'
//db.connect(uri)

dotenv.config()
const PORT = process.env.PORT | 3000
//const MONGO_URI = process.env.MONGO_URI
const app = express()

app.disable('x-powered-by')
app.use(urlencoded({ extended: true }))

app.use('/', router)
/*
curl -X POST http://localhost:3000/create -d 'url=https://webpai.vercel.app/&image_url=https://webpai.vercel.app/webpai-new.png&title=webpai&descri[tion=nut'
*/
app.listen(PORT, () => console.log(`listening on: ${PORT}`))
