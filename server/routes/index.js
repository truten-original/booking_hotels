const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/user', require('./user.routes'))
router.use('/room', require('./room.routes'))
router.use('/type', require('./type.routes'))
router.use('/convenience', require('./convenience.routes'))
router.use('/booking', require('./booking.routes'))
router.use('/bookmark', require('./bookmark.routes'))
module.exports = router
