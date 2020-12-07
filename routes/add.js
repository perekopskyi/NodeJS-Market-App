const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middlewares/auth')
const router = Router()

router.get('/', auth, (req, res, next) => {
  res.render('add', {
    title: 'Add course',
    isAdd: true,
  })
})

router.post('/', auth, async (req, res) => {
  const { title, price, img } = req.body
  const course = new Course({ title, price, img, userId: req.user })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
