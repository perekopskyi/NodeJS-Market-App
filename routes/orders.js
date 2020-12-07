const { Router } = require('express')
const Order = require('../models/order')
const auth = require('../middlewares/auth')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ 'user.userId': req.user._id }).populate(
      'user.userId'
    )
    res.render('orders', {
      isOrders: true,
      title: 'Orders',
      orders: orders.map((order) => {
        return {
          ...order._doc,
          price: order.courses.reduce((total, courses) => {
            return (total += courses.count * courses.course.price)
          }, 0),
        }
      }),
    })
  } catch (error) {
    console.error({ error })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate()

    const courses = user.cart.items.map((item) => ({
      count: item.count,
      course: { ...item.courseId._doc },
    }))

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    })

    await order.save()
    await req.user.clearCart()

    res.redirect('/orders')
  } catch (error) {
    console.error({ error })
  }
})

module.exports = router
