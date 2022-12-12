const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
    },
    images: [String],
    price: Number,
    sleepingPlaces: Number,
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    facilities: [{ type: Schema.Types.ObjectId, ref: 'Convenience' }],
  },
  {
    timestamps: true,
  }
)

module.exports = model('Room', schema)
