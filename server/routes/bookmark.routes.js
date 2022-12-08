const express = require('express')
const router = express.Router({ mergeParams: true })
const chalk = require('chalk')
const auth = require('../middleware/auth.middleware')
const Bookmark = require('../models/Bookmark')
router.route('/')
.get(async (req, res) => {
  try {
    const list = await Bookmark.find()
    res.send(list)
  } catch (error) {
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
.post(auth, async (req, res) => {
  try {
    const newBookmark = await Bookmark.create({...req.body, userId: req.user._id})
    res.status(201).send(newBookmark)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'на сервере произошла ошибка' })
  }
})
router.patch('/:bookmarkId',auth, async (req, res) => {
  try{

    const {bookmarkId} = req.params
    console.log(chalk.bgBlue(bookmarkId))
    const currentBookmark = await Bookmark.findById(bookmarkId)
    console.log(chalk.bgGray(currentBookmark))
    if(currentBookmark.userId.toString() === req.user._id){
        const updatedBookmark = await Bookmark.findByIdAndUpdate(bookmarkId, req.body, {new: true})
      res.send(updatedBookmark)
    }
  } catch (error) {
    console.log(error)
  }
    
})
module.exports = router
