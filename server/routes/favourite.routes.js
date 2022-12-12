const express = require('express')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })
const Favourite = require('../models/Favourite')
router
    .route('/')
    .get (auth, async (req,res) => {
        try {
            const {orderBy, equalTo} = req.query
            const list = await Favourite.find({[orderBy]: equalTo})
            res.send(list)
        } catch (error) {
            res.status(500).json({ message: 'на сервере произошла ошибка' })
        }
    })
    .post(auth, async (req, res) => {
        try {
          const newFavourite =  await Favourite.create({...req.body, userId: req.user._id})
          res.status(201).send(newFavourite)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'на сервере произошла ошибка' })
        }
    })
    router.delete('/:favouriteId', auth, async (req, res) => {
        try {
            const {favouriteId} = req.params
            const removedFavourite = await Favourite.findById(favouriteId)
            if(removedFavourite.userId.toString() === req.user._id){
                await removedFavourite.remove()
                return res.send(null)
            } else {
                res.status(401).json({message: 'Unauthorized'})
            }

        } catch (error) {

        }
    })
module.exports = router