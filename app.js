// app.js

const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const userlist = require('./userlist.json')
const port = 3000
let message = ""

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'checkUsersSecret',
  name: 'user',
  resave: false,
  saveUninitialized: false
}))

// route setting
// 觀察session內容
// app.get('/', (req, res) => {
//   console.log(req.session)
//   console.log(req.sessionID)
// })

app.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    console.log(req.session)
    return res.render('success', {
      firstName: req.session.user
    })
  } else {
    return res.render('index', { value: req.session.user })
  }

})

app.post('/', (req, res) => {
  const { account, password } = req.body
  const user = userlist.find(user => user.email === account)
  if (user) {
    if (user.password === password) {
      const firstName = user.firstName
      req.session.isLoggedIn = true
      req.session.user = firstName
      return res.render('success', { firstName })
    } else {
      message = "Wrong password.Try again or ..."
      return res.render('index', { message })
    }
  } else {
    message = "Could't find your account, please check again ><"
    return res.render('index', { message })
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('session destroyed')
  })
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`express is running on http:localhost${port}`)
})