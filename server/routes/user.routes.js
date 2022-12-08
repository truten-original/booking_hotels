const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
router.get('/', async (req, res) => {
  try {
    const list = await User.find()
    res.send(list)
    console.log(req.user)
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
router.get( '/:userId', auth, async (req, res) => {
  try {
    const {userId} = req.params
    const user = await User.findById(userId)
    res.send(user)
    console.log(req.user)
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
router.patch('/:userId', auth, async (req, res) => {
  try {
    const {userId} = req.params
    console.log(req.user)
    if(userId === req.user._id){
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
      res.send(updatedUser)
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})

module.exports = router
