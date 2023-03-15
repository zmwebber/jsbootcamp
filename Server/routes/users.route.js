import express from 'express'
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateUser,
    getAllUsers,
}  from '../controllers/users.controller.js'
const router = express.Router()

router.route('/users/add').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/getSelf').put(getCurrentUser);
router.route('/users/update').post(updateUser);
router.route('/users/getAll').get(getAllUsers);
export default router;