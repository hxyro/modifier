import express from 'express'
import * as user_controller from 'controllers/userController'

let router = express.Router()

router.get('/', user_controller.index_get)

router.get('/:userName', user_controller.userDashboard_get)

router.get('/:userName/:urlCode', user_controller.redirect_url_get)

router.post('/', user_controller.create_user_post)

router.post('/:userName', user_controller.create_url_post)

export { router }
