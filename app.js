const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const moviesRouter = require('./routes/movies')

// var hbs = require('hbs') // or... require('express-handlebar')
const { engine } = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const multiHelpers = hbsHelpers()
const helpers = require('./components/hbsHelpers')

const app = express()

// optional way
// __dirname + 'views/partials'
// hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {})
// view engine setup
// using hbs
// app.set('views', path.join(__dirname, 'views'))
// view using express-handlebars
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: helpers,
    partialsDir: ['views/partials'],
    layoutsDir: 'views',
    defaultLayout: 'layout',
  })
)
// registering helpers
// for (let helper in helpers) {
//   engine.registerHelper(helper, helpers[helper])
// }
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/movies', moviesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
