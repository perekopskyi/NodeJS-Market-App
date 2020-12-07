const { body } = require('express-validator')

exports.registerValidators = [
  body('email').isEmail().withMessage('Email is not correct'),
  body('password', 'Password length must be more than 6 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric(),
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password must match')
    }
    return true
  }),
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name length must be more than 3 characters'),
]
