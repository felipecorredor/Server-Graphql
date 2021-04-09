const Course = require('../database/models/Course')
const Student = require('../database/models/Student')

module.exports = {
  createCourse: async (root, { input }) => {
    const newCourse = new Course(input)
    newCourse.save()
    return newCourse
  },
  updateCourse: async (root, { id, input }) => {
    return await Course.findByIdAndUpdate(id, input, { new: true })
  },
  deleteCourse: async (root, { id }) => {
    return await Course.findByIdAndDelete(id)
  },
  createPerson: async (root, { input }) => {
    const newStudent = new Student(input)
    newStudent.save()
    return newStudent
  },
  deleteStudent: async (root, { id }) => {
    return await Student.findByIdAndDelete(id)
  },
  updatePerson: async (root, { id, input }) => {
    // third param is required to return the updated object
    return await Student.findByIdAndUpdate(id, input, { new: true })
  },
  addPeople: async (root, { courseId, personId }) => {
    return Course.findByIdAndUpdate(courseId, { $push: { people: personId } })
  },
}
