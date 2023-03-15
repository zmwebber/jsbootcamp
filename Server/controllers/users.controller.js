import jwt from 'jsonwebtoken'
import config from "../config/auth.config.js"
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
// @desc    Register new user
// @route   POST /api/users/add
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const user = req.body
  console.log(user)
  if (!user.name || !user.email || !user.password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email: user.email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword;
  // Create user
  const userResponse = await User.create(user)

  if (userResponse) {
    res.status(201).json({
      _id: userResponse.id,     
      name: userResponse.name,
      email: userResponse.email,
      token: generateToken(userResponse._id), // generate JWT
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt,
      Address1: user.Address1,
      Adress2: user.Adress2,
      City: user.City,
      State: user.State,
      ZipCode: user.ZipCode,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/getSelf
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Need method to update user information
export const updateUser = asyncHandler(async (req, res) =>  {
  console.log('updateUser') //debugging
  console.log('req: ' + JSON.stringify(req.body)) //make sure your request from postman is what you are sending over
 const userResponse = await User.findOneAndUpdate({ _id:req.body._id }, req.body, { new: true})
   if (userResponse) {
    res.status(201).json({
      'success':true,
      'message':'User updated successfully',
      'user': userResponse
    })
  } else {
    res.status(400).json({
      'success':false,
      'message':'updateUser method failed, user not found with _id: ' + req.body._id,
      'user': userResponse
    })
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '30 days',
  })
}

// @desc    Get all user data
// @route   GET /api/users/getAll
// @access  Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select({password:0});
  if (users) {
    res.status(201).json({
      'success':true,
      'message':'User updated successfully',
      'users': users
    })
  } else {
    res.status(400).json({
      'success':false,
      'message':'cannot find users',
      'user': users
    })
  }
})

export default {registerUser, loginUser, getCurrentUser, getAllUsers}
