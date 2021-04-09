'use strict'

module.exports = {
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) return 'Monitor'
      return 'Student'
    }
  }
}