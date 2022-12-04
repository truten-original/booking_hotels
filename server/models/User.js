const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
    },
    surName: {
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
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
