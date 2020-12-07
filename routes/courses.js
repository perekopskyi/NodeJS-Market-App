const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middlewares/auth')
const router = Router()

router.get('/', async (req, res, next) => {
  const courses = await Course.find().populate('userId', 'email')

  console.log({ courses })
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  })
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const course = await Course.findById(req.params.id)

  res.render('course-edit', {
    title: `Edit`,
    course,
  })
})

router.post('/edit', auth, async (req, res) => {
  try {
    const { id } = req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
  } catch (error) {
    console.log({ error })
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id })
    res.redirect('/courses')
  } catch (error) {
    console.log({ error })
  }
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: `Course "${course.title}"`,
    course,
  })
})

module.exports = router
