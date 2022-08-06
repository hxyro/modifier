import { error } from '../utils'
import { body, validationResult } from 'express-validator'

/* FORM VALIDATION LOGIC */

const trimmed = (values) => values.map((value) => body(value).trim())

const escaped = (values) => values.map((value) => body(value).escape())

const required = (values) =>
  values.map((value) =>
    body(value)
      .exists({ checkFalsy: true })
      .withMessage(error.IsRequired(value))
  )
const validName = (values) =>
  values.map((value) =>
    body(value)
      .isAlphanumeric('en-US', { ignore: '-_.' })
      .withMessage(error.NotValid(value))
  )
const validUrl = (values) =>
  values.map((value) =>
    body(value).isURL().withMessage(error.InvalidUrl(value))
  )
const maxLength = (values) =>
  values.map((value) =>
    body(value.field)
      .isLength({ max: value.len })
      .withMessage(error.LengthExceeded(value))
  )

/* DATABASE VALIDATION */

const userInDB = (model) => async (req, res, next) => {
  const msg = validationResult(req)
  if (!msg.isEmpty()) {
    return res.status(400).json({ errors: msg.array() })
  }
  const { user_name } = req.body
  try {
    const user = await model.user.findOne({ name: user_name })
    if (user) {
      res.json(error.NameTaken(user_name)).end()
    } else {
      next()
    }
  } catch (e) {
    console.log(e)
    res.json(error.ServerError).end()
  }
}

const modifierInDB = (model) => async (req, res, next) => {
  const msg = validationResult(req)
  if (!msg.isEmpty()) {
    return res.status(400).json({ errors: msg.array() })
  }
  const { user_name } = req.params
  const { modifier_name } = req.body
  try {
    await model.user
      .findOne({ name: user_name })
      .orFail(new Error(error.name, { message: user_name }))
    const modifier = await model.modifier
      .findOne({ modifier_name, user_name })
      .exec()
    if (modifier) {
      res.json(error.AlreadyExists('modifier', modifier_name)).end()
    } else {
      next()
    }
  } catch (e) {
    if (e.name === error.name) {
      res.send(error.DoesNotExists('user', e.message))
    }
    // res.json(error.UserDoesNotExist(user_name)).end()
    console.log(e)
    res.json(error.ServerError).end()
  }
}

export default {
  trimmed,
  escaped,
  required,
  validName,
  validUrl,
  maxLength,
  userInDB,
  modifierInDB,
}
