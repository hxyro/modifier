const markup = (url, audio_url, title, description) =>
  `<html lang="en">
    <head>
      <title>modifier</title>
	  	<meta http-equiv="refresh" content="0; url=${url}"/>
      <meta name="description" content="${description}"/>

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="object" />
      <meta property="og:url" content="${url}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}"/>
      <meta property="og:audio" content="${audio_url}" />
  
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="${url}" />
      <meta property="twitter:title" content="${title}" />
      <meta property="twitter:description" content="${description}"/>
      <meta property="twitter:player" content="${audio_url}" />
      
    </head>
    <body style="background: #202630">
      <h1 style="text-align: center; color: #c678dd; margin-top: 400px">Redirecting....</h1>
    </body>
  </html>`;
export default markup;
