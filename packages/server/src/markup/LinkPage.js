const LinkPage = (url, redirect_url) =>
  `<html lang="en" prefix="og: https://ogp.me/ns#">
    <head>
      <title>modifier</title>
    </head>
    <body>
      <div style="display: flex; justify-content: center; width: 100%; height: 100%; align-items: center;">
        <div style="margin: auto 0;">
          <p>
            Your modified URL is 
            <a style="text-decoration: none;" href="${url}">${url}</a>
            , redirecting to 
            <a style="text-decoration: none;" href="${redirect_url}">${redirect_url}</a>
          </p>
      </div>
</body>
  </html>`
export default LinkPage
