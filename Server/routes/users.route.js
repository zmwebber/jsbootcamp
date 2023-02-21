import express from 'express'
import {
    registerUser,
    loginUser,
    getCurrentUser,
}  from '../controllers/users.controller.js'
const router = express.Router()

router.route('/users/add').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/getSelf').put(getCurrentUser);

export default router;