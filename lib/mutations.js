'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },
  editCourse: async (root, { _id, input }) => {
    let db, course
    try {
      db = await connectDb()
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      course = await db.collection('courses').findOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db
    try {
      db = await connectDb()
      await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }
    return "Course was deleted successfully"
  },
  createStudent: async (root, { input }) => {
    let db, student
    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  editStudent: async (root, { _id, input }) => {
    let db, student
    try {
      db = await connectDb()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      student = await db.collection('students').findOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  deleteStudent: async (root, { _id }) => {
    let db
    try {
      db = await connectDb()
      await db.collection('students').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }
    return "Student was deleted successfully"
  },
  addPeople: async(root, { courseID, personID }) => {
    let db, person, course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne(
        { _id: ObjectID(courseID) }
      )
      person = await db.collection('students').findOne(
        { _id: ObjectID(personID) }
      )

      if (!course || !person) throw new Error('Person or Course not exist')

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID)} }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  }
}


// COURSE_ID: 605ea46eee30ce74b8defd04
// STUDENT_ID: 605ea44fee30ce74b8defd03