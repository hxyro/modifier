import express from 'express'
import isbot from 'isbot'

const PORT = 3000
const app = express()

const html = (url, title) =>
  `<html lang="en">
    <head>
      <title>nut</title>
	  	<meta http-equiv="refresh" content="0; url=${url}"/>
  		<meta property="og:type" content="object" />
      <meta property="og:url" content="${url}" />
      <meta property="og:title" content="${title}" />
		  <meta property="og:description" content="Webpai is a decentralized image-board website hosted on the Polygon." />
  		<meta property="og:image" content="https://webpai.vercel.app/webpai-new.png"/>
  		<meta property="og:image:width" content="1200" />
  		<meta property="og:image:height" content="628" />
    </head>
    <body style="background: black">
      <h1 style="text-align: center; color: red">fuck yeah</h1>
      <h1 style="text-align: center; color: blue">redirecting....</h1>
    </body>
  </html>`

app.get('/', (req, res) => {
  if (isbot(req.get('user-agent'))) {
    console.log("It is a bot");
    res.send(html('https://github.com/hxyro/webpai-app', 'webpai'))
  }
  else {
    res.redirect("https://www.google.com");
    console.log("NOT BOT");
  }

}
  
)
app.listen(PORT, () => console.log(`listening: ${PORT}`))
