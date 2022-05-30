// app.js

const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

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
  console.log(`account: ${account} password: ${password}`)
  res.render('index')
})

app.listen(port, () => {
  console.log(`express is running on http:localhost${port}`)
})