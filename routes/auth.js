const { Router } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Authorization',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError'),
  })
})

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/auth/login#login')
    })
  } catch (error) {
    console.error({ error })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = await bcryptjs.compare(password, candidate.password)
      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save((err) => {
          if (err) {
            throw err
          } else {
            res.redirect('/')
          }
        })
      } else {
        req.flash('loginError', 'Email or password is not correct')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'User do not exist')
      res.redirect('/auth/login#login')
    }
  } catch (error) {
    console.error({ error })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body

    const candidate = await User.findOne({ email })
    if (candidate) {
      req.flash('registerError', 'User with same email already exist')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcryptjs.hash(password, 10)
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: { items: [] },
      })

      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (error) {
    console.error({ error })
  }
})

module.exports = router
