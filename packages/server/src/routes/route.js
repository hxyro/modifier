import { Router } from 'express'
import { model } from '../models'
import { controller, validator } from '../controllers'

const router = Router()
//TODO: add validator

// Homepage
// -> curl -X GET http://localhost:3000/
router.get('/', controller.index)
router.get('/favicon.ico', controller.index)

// Create New User
// -> curl -X POST http://localhost:3000/alter -d 'user_name=hxyro'
router.post(
  '/alter',
  validator.trimmed(['user_name']),
  validator.required(['user_name']),
  validator.validName(['user_name']),
  validator.escaped(['user_name']),
  validator.userInDB(model),
  controller.createUser(model)
)

// Delete User
// -> curl -X DELETE http://localhost:3000/alter/hxyro
router.delete('/alter/:user_name', controller.deleteUser(model))

// Get User Details
// -> curl -X GET http://localhost:3000/hxyro
router.get('/u/:user_name', controller.getUser(model))

// Create Modifier
// -> curl -X POST http://localhost:3000/u/hxyro/webpai -d 'redirect_url=https://webpai.vercel.app/&asset_url=https://webpai.vercel.app/webpai-new.png&title=webpai&description=nut'
router.post('/u/:user_name/m',
  validator.trimmed(['modifier_name', 'redirect_url', 'asset_url', 'title', 'description']),
  validator.required(['modifier_name', 'redirect_url', 'asset_url', 'title', 'description']),
  validator.validUrl(['redirect_url', 'asset_url']),
  validator.maxLength([
    { field: 'title', len: 30 },
    { field: 'description', len: 300 },
  ]),
  validator.escaped(['title', 'description']),
  validator.modifierInDB(model),
  controller.createModifier(model)
)

// Delete Modifier
// -> curl -X DELETE http://localhost:3000/hxyro/webpai
router.delete('/u/:user_name/:modifier_name', controller.deleteModifier(model))

// Redirect
// -> curl -X GET http://localhost:3000/hxyro/webpai
router.get('/:user_name/:modifier_name', controller.redirect(model))

//Get Temporary S3 Url(expires: 30sec)
router.get('/s3url', controller.s3Url)

export default router
