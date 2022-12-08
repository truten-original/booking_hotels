const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
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

module.exports = model('Favourite', schema)
