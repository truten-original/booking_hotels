const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    value: {
      type: Number,
      required: true,
      default: 0,
      min: 1,
      max: 5,
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
  },
  {
    timestamps: {createdAt: 'created_at'},
  }
)

module.exports = model('Bookmark', schema)
