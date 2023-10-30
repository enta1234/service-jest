const userModels = require('../models/user.model')

exports.findUser = async () => {
  return userModels.length ? userModels : null
}

exports.findUserById = async (userId) => {
  const foundedUser = userModels.find(user => user.id === userId)
  return foundedUser ? foundedUser : null
}
