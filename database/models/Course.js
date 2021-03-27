const mongoose = require('mongoose')
const { Schema } = mongoose

const courseSchema = new Schema({
  title: String,
  teacher: String,
  description: String,
  topic: String,
  people: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
})
module.exports = mongoose.model('Course', courseSchema)