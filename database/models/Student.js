const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
  name: String,
  email: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
})
module.exports = mongoose.model('Student', studentSchema)