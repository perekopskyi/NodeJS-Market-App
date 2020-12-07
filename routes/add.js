const { Router } = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', (req, res, next) => {
  res.render('add', {
    title: 'Add course',
    isAdd: true,
  })
})

router.post('/', async (req, res) => {
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
