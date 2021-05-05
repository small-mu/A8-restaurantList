const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

require('./config/mongoose')

app.use(express.static('public'))

//layout setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//新增餐廳
app.get('/new', (req, res) => {
  res.render('new')
})


//搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({
    "$or": [
      { "name": { $regex: `${keyword}`, $options: '$i' } },
      { "category": { $regex: `${keyword}`, $options: '$i' } }
    ]
  })
    .lean()
    .then(rest => res.render('index', { restaurants: rest, keyword: keyword }))

})


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})