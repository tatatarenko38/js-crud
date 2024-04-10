// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  constructor(name, price, description) {

    this.id = Math.floor(Math.random() * 90000) + 10000

    this.createDate = new Date().toISOString()

    this.name = name
    this.price = price
    this.description = description


  }


  static add = (product) => {
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

  static update = (product, { name, price, description }) => {
    if (name, price, description) {
      product.name = name
      product.price = price
      product.description = description
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex((product) => product.id === id,)
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
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
  //const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    // data:{
    //   products:{
    //     list,
    //     isEmpty:list.length === 0,
    //   },
    // },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

router.post('/product-create', function (req, res) {

  const { name, price, description } = req.body

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
  const list = Product.getList()
  const isEmpty = list.length === 0
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
    data: {
      list,
      isEmpty
    }
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
 const { id } = req.query

 

  const product = Product.getById(Number(id))
 
    Product.update(product, { name, price, description })
 
   res.render('product-edit', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/product-edit', function (req, res) {

  const { name, price, description } = req.body

    const product = Product.getById(Number(id))
  if (product) {
    Product.update(product, { name, price, description })
    result = true
  }

  res.render('alert', {
    style: 'alert',
    info: 'Товар з таким ID не знайдено'
  })
})
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-delete', function (req, res) {
  const { id } = req.query
  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: 'Товар видалений',
  })
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
