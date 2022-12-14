import { Router } from 'express'
import userController from '../controllers/UserController'

import loginRequired from '../middlewares/loginRequired'

const router = new Router()

// when loginRequired:  JWT via loginRequired middleware identifies the id to be updated

router.get('/', loginRequired, userController.index)
router.post('/', userController.store)
router.get('/:id', loginRequired, userController.show) // user can see others
router.put('/', loginRequired, userController.update) // user only updates their own account
router.delete('/', loginRequired, userController.delete) // user only deletes their own account

export default router
