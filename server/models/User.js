const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    surName: {
        type: String,
        required: true
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
