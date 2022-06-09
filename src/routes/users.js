import express from 'express'
import * as user_controller from 'controllers/userController'

let router = express.Router()

// Index page
router.get('/', user_controller.index_get)

// User's dashboard
router.get('/:userName', user_controller.userDashboard_get)

// GET request for fetching/redirecting already exists modified URL from data base
router.get('/:userName/:urlCode', user_controller.redirect_url_get)

// POST request to create root AT ROOT route (for now)
router.post('/', user_controller.create_user_post)

// POST request to create a new modified URL AT USERNAME route (for now)
router.post('/:userName', user_controller.create_url_post)

export { router }
