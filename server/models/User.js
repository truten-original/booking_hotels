const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: String,
    sex: { type: String, enum: ['male', 'female'] },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
