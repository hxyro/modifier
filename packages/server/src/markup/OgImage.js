const markup = (url, image_url, title, description) =>
  `<html lang="en" prefix="og: https://ogp.me/ns#">
    <head>
      <title>modifier</title>
	  	<meta http-equiv="refresh" content="0; url=${url}"/>
      <meta name="description" content="${description}"/>

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="object" />
      <meta property="og:url" content="${url}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}"/>
      <meta property="og:image" content="${image_url}"/>
      <meta property="og:image:alt" content="${description}"/>
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="${title}">
  
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="${url}" />
      <meta property="twitter:title" content="${title}" />
      <meta property="twitter:description" content="${description}"/>
      <meta property="twitter:image" content="${image_url}" />
      
    </head>
    <body style="background: #202630">
      <h1 style="text-align: center; color: #c678dd; margin-top: 400px">Redirecting....</h1>
    </body>
  </html>`
export default markup
