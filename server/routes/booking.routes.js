const express = require('express')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })
const Booking = require('../models/Booking')

router
  .route('/')
  .get('/', auth, async (req, res) => {
    try {
      const list = await Booking.find()
      res.status.send(list)
    } catch (error) {
      res.status(500).json({ message: 'на сервере произошла ошибка' })
    }
  })
  .post('/', auth, async (req, res) => {
    try {
      const newBooking = Booking.create({ ...req.body, userId: req.user._id })
      res.status(201).send(newBooking)
    } catch (error) {
      res.status(500).json({ message: 'на сервере произошла ошибка' })
    }
  })
router.get('/:roomId', auth, async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query
    const list = await Booking.find({ [orderBy]: equalTo })
    res.status.send(list)
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
router.delete('/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params
    const removedBooking = await Comment.findById(commentId)
    if (removedBooking.userId.toString() === req.user._id) {
      await removedBooking.remove()
      return res.send(null)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {}
})

module.exports = router
