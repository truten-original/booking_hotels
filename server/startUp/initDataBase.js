const facilitiesMock = require('../mock/facilities.json')
const typesMock = require('../mock/types.json')
const roomsMock = require('../mock/rooms.json')
const Type = require('../models/Type')
const Convenience = require('../models/Convenience')
const Room = require('../models/Room')
module.exports = async () => {
const types = await Type.find()
if(types.length !== typesMock.length){
    createInitialEntity(Type, typesMock)
}
const facilities = await Convenience.find()
if(facilities.length !== facilitiesMock.length){
    createInitialEntity(Convenience, facilitiesMock)
}
// const rooms = await Room.find()
// if(rooms.length !== roomsMock.length){
//     createInitialEntity(Room, roomsMock)
// }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                return error
            }
        })
    )
}