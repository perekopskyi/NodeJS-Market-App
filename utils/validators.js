const { body } = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Email is not correct')
    .custom(async (value, { req }) => {
      try {
        const candidate = await User.findOne({ email: value })
        if (candidate) {
          return Promise.reject('User with same email already exist')
        }
      } catch (error) {
        console.error({ error })
      }
    })
    .normalizeEmail(),
  body('password', 'Password length must be more than 6 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password must match')
      }
      return true
    })
    .trim(),
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name length must be more than 3 characters')
    .trim(),
]

exports.courseValidators = [
  body('title')
    .isLength({ min: 3 })
    .withMessage('Title length must be more than 3 characters')
    .trim(),
  body('price').isNumeric().withMessage('Enter correct price'),
  body('img', 'Insert correct url ').isURL(),
]
