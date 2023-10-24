const userModels = require('../models/user.model')

exports.findUserById = (userId) => {
  const foundedUser = userModels.find(user => user.id === userId)
  return foundedUser ? foundedUser : null
}

exports.findUser = (userId) => {
  return userModels.length ? userModels : null
}