const Course = require('../database/models/Course')
const Student = require('../database/models/Student')

module.exports = {
  getCourses: async () => await Course.find().populate('people'),
  getCourse: async (root, args) => { return await Course.findById(args.id).populate('people') },
  getPeople: async () => await Student.find(),
  getPerson: async (root, args) => await Student.findById(args.id)
}