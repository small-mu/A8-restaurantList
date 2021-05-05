
const Restaurant = require('../../models/restaurant')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Mongodb connected!')
  //取得餐廳JSON檔
  for (let i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('Done!')
})

