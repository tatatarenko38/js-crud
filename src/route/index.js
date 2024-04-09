// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  constructor( name, price, description) {

    this.id =  Math.floor(Math.random() * 90000) + 10000

    this.createDate = new Date().toISOString()

    this.name = name
    this.price = price
    this.description = description

    
  }
 

 static add = (product) =>{
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
  this.#list.find((product) => product.id === id)

  static updateById = (id, data) => {
    const product = this.getById(id)

    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  static update = (product, { id }) => {
    if (id) {
      product.id = id
    }
  }

  static deleteById = (id) =>{
   const value = this.#list.find((product) => product.id === id,)
   if(product.id === id){
    this.#list.splice(this.#list.indexOf(product),1)
    return true
   }
   else{
    return false
   }
  }

}


//==================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  
  // res.render генерує нам HTML сторінку
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
   
    data:{
      products:{
        list,
        isEmpty:list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

router.post('/product-create', function (req, res) {
  
   const {name, price, description} = req.body

   const product = new Product(name, price, description)

   Product.add(product)

   console.log(Product.getList())
   res.render('alert', {
   style: 'alert',
   info: 'Товар створений',
   })
})

// ================================================================
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  console.log(req.body)
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
  const { id } = req.query
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-edit', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
