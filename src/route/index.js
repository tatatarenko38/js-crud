// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Track {
  //статичне приватне поле для зберігання списку об'єктів Track
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000) // генеруємо випадкове id із 4 чисел
    this.name = name
    this.author = author
    this.image = image
  }

  //Статичний метод для створення об'єкту Track і додоавання його до списку #list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  //Статичний метод для отримання всього списку треків
  static getList() {
    return this.#list.reverse()
  }

  static getById(id) {
    return (
      Track.#list.find((track) => track.id === id,)
      || null
    )
  }
}

Track.create(
  'Інь Ян',
  'MONATIK i ROXOLANA',
  'https://picsum.photos/100/100',
)
Track.create(
  'Baila Conmigo (Remix)',
  'Selena Gomes i Rauw Alejandro',
  'https://picsum.photos/100/100',
)
Track.create(
  'Shameless',
  'Camila Cabello',
  'https://picsum.photos/100/100',
)
Track.create(
  'DAKITI',
  'BAD BUNNY i JHAY',
  'https://picsum.photos/100/100',
)
Track.create(
  '11 PM',
  'Maluna',
  'https://picsum.photos/100/100',
)
Track.create(
  'Інша любов',
  'Enleo',
  'https://picsum.photos/100/100',
)

//console.log(Track.getList())

class PlayList {
  //статичне приватне поле для зберігання списку об'єктів PlayList
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.tracks = [] //список треків, які додані до плейлиста
    this.image = 'https://picsum.photos/100/100'
  }

  //Статичний метод для створення об'єкту PlayList і додавання його до списку #list
  static create(name) {
    const newPlayList = new PlayList(name)
    this.#list.push(newPlayList)
    return newPlayList
  }

  //Статичний метод для отримання всього списку плейлистів
  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playList) {
    const allTracks = Track.getList()

    let randomTrack = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    // однією дією буде записано сразу 3 трека
    playList.tracks.push(...randomTrack)
  }

  static getById(id) {
    return (
      PlayList.#list.find((playList) => playList.id === id,)
      || null
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter((track) => track.id !== trackId)
  }

  addTrack(track) {
    this.tracks.push(track)
    return track
  }

}

// ================================================================

router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-choose',
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
router.get('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix
  //console.log(isMix)

  res.render('spotify-create', {
    style: 'spotify-create',
    data: {
      isMix,
    },
  })
})
// ================================================================
router.post('/spotify-create', function (req, res) {
  // console.log(req.body, req.query)
  const isMix = !!req.query.isMix

  const name = req.body.name

  if (!name) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Введіть назву плейліста',
        link: isMix
          ? '/spotify-create?isMix=tpue'
          : '/spotify-create',
      },
    })
  }
  //функціонал створення playList
  const playList = PlayList.create(name)

  if (isMix) {
    PlayList.makeMix(playList)
  }

  console.log(playList)
  res.render('spotify-playList', {
    style: 'spotify-playList',
    data: {
      playListId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })

  // res.render('alert', {
  //   style: 'alert',
  //   data: {
  //     message: 'Успішно',
  //     info: 'Плейліст створений',
  //     link:
  //       `/spotify-playList?id=${play.list.id}`,
  //   },
  // })
})

//===================================================
router.get('/spotify-playList', function (req, res) {
  const id = Number(req.query.id)

  const playList = PlayList.getById(id)

  if (!playList) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: `/`,
      },
    })
  }

  res.render('spotify-playList', {
    style: 'spotify-playList',
    data: {
      playListId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })
})
// ================================================================
router.get('/spotify-track-delete', function (req, res) {
  const playListId = Number(req.query.playListId)
  const trackId = Number(req.query.trackId)

  const playList = PlayList.getById(playListId)

  if (!playList) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: `/spotify-playList?id=${playListId}`,
      },
    })
  }

  playList.deleteTrackById(trackId)

  res.render('spotify-playList', {
    style: 'spotify-playList',
    data: {
      playListId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })
})
// ============================================================
router.get('/spotify-track-add', function (req, res) {
  res.render('spotify-track-add', {
    style: 'spotify-track-add',
    data: {
      tracks: Track.getList(),
    },
  })
})
// ================================================================
router.post('/spotify-track-add', function (req, res) {
  const playListId = Number(req.body.playListId)
  const trackId = Number(req.body.trackId)

  const playList = PlayList.getById(playListId)
  const track = Track.getById(trackId)

  playList.addTrack(track)

  res.render('spotify-playList', {
    style: 'spotify-playList',
    data: {
      playListId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })
})
// Підключаємо роутер до бек-енду
module.exports = router

//const bonus = Purchase.calcBonusAmount(totalPrice)
