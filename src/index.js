import express, { urlencoded } from 'express'
import isbot from 'isbot'
import dotenv from 'dotenv'
import { markup } from './markup'

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

app.get('/', (req, res) => {
  if (isbot(req.get('user-agent'))) {
    console.log('It is a bot')
    res.send(
      markup.OgImage(
        'https://webpai.vercel.app/',
        'https://webpai.vercel.app/webpai-new.png',
        'webpai',
        'nut'
      )
    )
  } else {
    res.redirect('https://webpai.vercel.app/')
    console.log('NOT BOT')
  }
})
app.post('/create', (req, res) => {
  console.log(req.body)
  res.end()
})
/*
curl -X POST http://localhost:3000/create -d 'url=https://webpai.vercel.app/&image_url=https://webpai.vercel.app/webpai-new.png&title=webpai&descri[tion=nut'
*/
app.listen(PORT, () => console.log(`listening on: ${PORT}`))
