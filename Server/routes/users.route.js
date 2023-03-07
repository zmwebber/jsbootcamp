import express from 'express'
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateUser,
}  from '../controllers/users.controller.js'
const router = express.Router()

router.route('/users/add').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/getSelf').put(getCurrentUser);
router.route('/users/update/').post(updateUser);
export default router;