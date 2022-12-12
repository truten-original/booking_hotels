const express = require('express')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })
const Booking = require('../models/Booking')
router
  .route('/')
  .get(  async (req, res) => {
    try {
      const list = await Booking.find()
      res.send(list)
    } catch (error) {
      res.status(500).json({ message: 'на сервере произошла ошибка' })
    }
  })
  .post( auth, async (req, res) => {
    try {
      const newBooking = await Booking.create({ ...req.body, userId: req.user._id })
      res.status(201).send(newBooking)
    } catch (error) {
      res.status(500).json({ message: 'на сервере произошла ошибка' })
    }
  })
router.get('/:roomId', async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query
    const list = await Booking.find({ [orderBy]: equalTo })
    res.send(list)
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params
    console.log(bookingId)
    const removedBooking = await Booking.findById(bookingId)
      await removedBooking.remove()
      return res.send(null)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
