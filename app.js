// app.js

const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const userlist = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]
let message = ""
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { account, password } = req.body
  const user = userlist.find(user => user.email === account)
  if (user) {
    if (user.password === password) {
      const firstName = user.firstName
      res.render('success', { firstName })
    } else {
      message = "Wrong password.Try again or ..."
      res.render('index', { message })
    }
  } else {
    message = "Could't find your account, please check again ><"
    res.render('index', { message })
  }
})

app.listen(port, () => {
  console.log(`express is running on http:localhost${port}`)
})