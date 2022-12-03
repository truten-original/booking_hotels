const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
    },
    images: {
      type: Array,
    },
    price: Number,
    sleepingPlaces: Number,
    completeMeetings: Number,
    type: {type: Schema.Types.ObjectId, ref: 'Type'},
    qualities: [{type: Schema.Types.ObjectId, ref: 'Convenience'}],
    rate: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = model('Room', schema)
