import { Router } from 'express'
import { model } from '../models'
import { controller } from '../controllers/controller'

const user_validate = (req, res, next) => {
  if (req.body.user_name) {
    next()
  } else {
    res.json({ error: 'user_name is required property' }).end()
  }
}

export const router = Router()
//TODO: add validator

// Homepage
// -> curl -X GET http://localhost:3000/
router.get('/', controller.index)

// Create New User
// -> curl -X POST http://localhost:3000/alter -d 'user_name=hxyro'
router.post('/alter', user_validate, controller.createUser(model))

// Delete User
// -> curl -X DELETE http://localhost:3000/alter/hxyro
router.delete('/alter/:user_name', controller.deleteUser(model))

// Get User Details
// -> curl -X GET http://localhost:3000/hxyro
router.get('/:user_name', controller.getUser(model))

// Create Modifier
// -> curl -X POST http://localhost:3000/hxyro/webpai -d 'redirect_url=https://webpai.vercel.app/&asset_url=https://webpai.vercel.app/webpai-new.png&title=webpai&description=nut'
router.post('/:user_name/:modifier_name', controller.createModifier(model))

// Delete Modifier
// -> curl -X DELETE http://localhost:3000/hxyro/webpai
router.delete('/:user_name/:modifier_name', controller.deleteModifier(model))

// Redirect
// -> curl -X GET http://localhost:3000/hxyro/webpai
router.get('/:user_name/:modifier_name', controller.redirect(model))
