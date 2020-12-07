const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRouter = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
    const id = '5fcb629d4d840d40e864e5c9' // !FOR TEST
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (error) {
    console.log(error)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRouter)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3003

async function start() {
  try {
    // Database Connection URL
    const url =
      'mongodb://root:rootpassword@localhost:27017?retryWrites=true&w=majority' ||
      'mongodb://localhost:27017'

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })

    // const collection = mongoose.connection('shop')

    const candidate = await User.findOne()
    console.log('🚀 ~ file: index.js ~ line 62 ~ start ~ candidate', candidate)
    if (!candidate) {
      const user = new User({
        email: 'yevhenii@mail.ru',
        name: 'Yevhenii',
        cart: { items: [] },
      })
      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is runing on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log({ error })
  }
}

start()
