// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Product.#count //генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }

  static add = (...data) => {
    const newProduct = new Product(...data)

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    //фільтруємо товари, щоб вилучити тойЮ з яким порівнюємо id
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    //відсортуємо за допомогою Math.random() та перемішаємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    // повертаємо перші три елемента з перемішаного масиву
    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ/`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер ProLine Business (B112p19) Intel Core i5 9400F/`,
  `Intel Core i5 9400F (2.9- 4.1 ГГц) / RAM 8 ГБ / Intel UHD Graphics 630/`,
  [{ id: 2, text: 'Топ продажів' }],
  20000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер ProLine Workstation (W67p03) Intel Xeon E-2226G/`,
  `Intel Xeon E-2226G (3.4 - 4.7 ГГц) / RAM 16 ГБ / SSD 512 ГБ / nVidia Quadro P620, 2 ГБ`,
  [{ id: 1, text: 'Готовий до відправки' }],
  40000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `2Комп'ютер ProLine Workstation (W67p03) Intel Xeon E-2226G/`,
  `Intel Xeon E-2226G (3.4 - 4.7 ГГц) / RAM 16 ГБ / SSD 512 ГБ / nVidia Quadro P620, 2 ГБ`,
  [{ id: 1, text: 'Готовий до відправки' }],
  50000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `3Комп'ютер ProLine Workstation (W67p03) Intel Xeon E-2226G/`,
  `Intel Xeon E-2226G (3.4 - 4.7 ГГц) / RAM 16 ГБ / SSD 512 ГБ / nVidia Quadro P620, 2 ГБ`,
  [{ id: 1, text: 'Готовий до відправки' }],
  38000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `4Комп'ютер ProLine Workstation (W67p03) Intel Xeon E-2226G/`,
  `Intel Xeon E-2226G (3.4 - 4.7 ГГц) / RAM 16 ГБ / SSD 512 ГБ / nVidia Quadro P620, 2 ГБ`,
  [{ id: 1, text: 'Готовий до відправки' }],
  45000,
  10,
)

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    //const amount = price * Purchase.#BONUS_FACTOR
    //або

    const amount = this.calcBonusAmount(price)

    const currentBalance = Purchase.getBonusBalance(email)

    const updatedBalance =
      currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updatedBalance)

    console.log(email, updatedBalance)

    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null

    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)

    this.#list.push(newPurchase)

    return newPurchase
  }

  static getList = () => {
    return Purchase.#list.reverse()
  }

  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }

  static updateById = (id, data) => {
    //const purchase = Purchase.#list.find((item) => item.id === id,)
    //або
    const purchase = Purchase.getById(id)
    if (purchase) {
      if (data.firstname)
        purchase.firstname = data.firstname
      if (data.lastname) purchase.lastname = data.lastname
      if (data.phone) purchase.phone = data.phone
      if (data.email) purchase.email = data.email

      return true
    } else {
      return false
    }
  }
}

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }

  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALE25', 0.75)

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('alert', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'alert',

//     data: {
//       message: 'Операція успішна',
//       info: 'Товар створений',
//       link: '/test-path',
//     },
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  // res.render('purchase-index', {
  //   // вказуємо назву папки контейнера, в якій знаходяться наші стилі
  //   style: 'purchase-index',
  //   data: {
  //     img: 'https://picsum.photos/200/300',
  //     title: `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  //     description: `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ`,
  //     category: [
  //       { id: 1, text: 'Готовий до відправки' },
  //       { id: 2, text: 'Топ продажів' },
  //     ],
  //     price: 27000,
  //   },
  // })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

router.get('/purchase-product', function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

router.post('/purchase-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount < 1) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  const product = Product.getById(id)

  if (product.amount < 1) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такої кількості товару немає в наявності',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-create',

    data: {
      id: product.id,

      cart: [
        {
          text: `${product.title} (${amount} шт)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

router.post('/purchase-submit', function (req, res) {
  // res.render генерує нам HTML сторінку
  // console.log(req.query)
  // console.log(req.body)

  const id = Number(req.query.id)
  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,

    promocode,
    bonus,
  } = req.body

  const product = Product.getById(id)

  if (!product) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Товару немає в потрібній кількості',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Некоректні дані',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: `Заповніть обов'язкові поля`,
        info: 'Некоректні дані',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firstname,
      lastname,
      email,
      phone,

      promocode,
      comment,
    },
    product,
  )
  console.log(purchase)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
      message: 'Успішно',
      info: 'Замовлення створено',
      link: `/purchase-list`,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// router.get('/purchase-list', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const id = Number(req.query.id)
//   const purchase = Purchase.getById(id)

//   if (!purchase) {
//     console.log('Замовлення не знайдено')
//   }
//   console.log(req.query)
//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('purchase-list', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'purchase-list',
//     data: {
//       id: purchase.id,
//       title: purchase.title,
//       totalPrice: purchase.totalPrice,
//       bonus: purchase.bonus
//     }
//   })
//   // ↑↑ сюди вводимо JSON дані
// })
// // ================================================================

router.get('/purchase-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  //const bonus = Purchase.calcBonusAmount(totalPrice)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-list',
    data: {
      list: Purchase.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
router.get('/purchase-info', function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id)
  const purchase = Purchase.getById(id)
  //const { id } = req.query
  console.log(req.query)
  console.log(req.body)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-info',
    data: {
      purchase,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/purchase-update', function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id)
  const purchase = Purchase.updateById(id)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-update', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-update',
    data: {
      list: purchase,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// Підключаємо роутер до бек-енду
module.exports = router

//const bonus = Purchase.calcBonusAmount(totalPrice)
