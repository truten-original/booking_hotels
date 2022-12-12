const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    arrivalDate: {
      type: Number,
      required: true,
    },
    departureDate: {
      type: Number,
      required: true,
    },
    guestsCount: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 8
    },
    price: Number,
    discount: Number,
      roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
  {
    timestamps: {createdAt: 'created_at'},
  }
)

module.exports = model('Booking', schema)
