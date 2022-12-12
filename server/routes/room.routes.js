const express = require('express')
const router = express.Router({ mergeParams: true })
const Room = require('../models/Room')

router.get('/', async (req, res) => {
  try {
    const list = await Room.find()
    res.status(200).send( list )
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
router.post('/', async (req, res) => {
  try {
   const room = await Room.create(req.body)
    res.status(200).send(room)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
module.exports = router

