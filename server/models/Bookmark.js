const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    bookmark: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
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
    timestamps: true,
  }
)

module.exports = model('Bookmark', schema)
