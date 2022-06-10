import isbot from 'isbot'
const { body, validationResult } = require('express-validator')
//import { markup } from 'markup'
//import { user, modifier } from 'models/index.js'

export const index_get = (req, res) => {
  res.send('Homepage')
}

export const userDashboard_get = (req, res) => {
  // Display user data
  res.send(`${req.params.userName} Dashboard`)
}

export const redirect_url_get = (req, res) => {
  if (isbot(req.get('user-agent'))) {
    // Render template string
  } else {
    // get original url
    res.send(req.params)
  }
}

export const create_url_post = [
  body('urlCode')
    .trim()
    .isAlphanumeric('en-US', { ingore: '-' })
    .withMessage('UrlCode contains invalid characters')
    .escape(),

  body('url').trim().isURL().withMessage('Invalid website url').escape(),

  body('title')
    .trim()
    .isLength({ max: 30 })
    .withMessage('tilte <= 30')
    .escape(),

  body('asset_url').trim().isURL().withMessage('Invalid image url').escape(),

  body('description')
    .trim()
    .isLength({ max: 100 })
    .withMessage('description too long')
    .escape(),

  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // update user data
    res.send(req.body)
  },
]

export const create_user_post = [
  body('userName')
    .trim()
    .isAlphanumeric('en-US', { ingore: '-' })
    .withMessage('Username must contain only alphanumeric characters')
    .escape(),

  (req, res) => {
    const newUser = req.body.userName
    // Add user to DB
    res.send(req.body)
  },
]
