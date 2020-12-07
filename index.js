const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRouter = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const varMiddleware = require('./middlewares/variables')
const userMiddleware = require('./middlewares/user')

// Database Connection URL
const MONGODB_URI =
  'mongodb://root:rootpassword@localhost:27017?retryWrites=true&w=majority' ||
  'mongodb://localhost:27017'
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI,
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'some secret value', //! env data
    resave: false,
    saveUninitialized: false,
    store,
  })
)
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRouter)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3003

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })

    // const collection = mongoose.connection('shop')

    // const candidate = await User.findOne()
    // if (!candidate) {
    //   const user = new User({
    //     email: 'yevhenii@mail.ru',
    //     name: 'Yevhenii',
    //     cart: { items: [] },
    //   })
    //   await user.save()
    // }

    app.listen(PORT, () => {
      console.log(`Server is runing on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log({ error })
  }
}

start()
