const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Netflix Clone', email: '' })
})

router.post('/signup', (req, res) => {
  const email = req.body.email_input
  res.render('index', { title: 'Netflix Clone', email })
})

module.exports = router
