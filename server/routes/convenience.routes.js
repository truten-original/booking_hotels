const express = require('express')
const router = express.Router({ mergeParams: true })
const Convenience = require('../models/Convenience')
router.get('/', async (req, res) => {
  try {
    const list = await Convenience.find()
    res.status(200).send( list )
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})

module.exports = router