const Course = require('../database/models/Course')
const Student = require('../database/models/Student')

module.exports = {
  createCourse: async (root, { input }) => {
    const newCourse = new Course(input)
    newCourse.save()
    return newCourse
  },
  createStudent: async (root, { input }) => {
    const newStudent = new Student(input)
    newStudent.save()
    return newStudent
  },
  deleteStudent: async (root, { id }) => {
    return await Student.findByIdAndDelete(id)
  },
  updateStudent: async (root, { id, input }) => {
    // third param is required to return the updated object
    return await Student.findByIdAndUpdate(id, input, { new: true })
  },
  addPeople: async (root, { courseId, personId }) => {
    return Course.findByIdAndUpdate(courseId, { $push: { people: personId } })
  },
}
