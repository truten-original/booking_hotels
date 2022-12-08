const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    comment: {
      type: String,
      required: true},
      roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
      },
       userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    },
  {
    timestamps: true,
  }
)

module.exports = model('Comment', schema)
