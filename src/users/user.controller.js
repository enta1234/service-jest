const userModels = require('../models/user.model')

const getUser = (req, res) => {
  const ret = userModels
  return res.json(ret)
}

const getUserById = (req, res) => {
  const userId = req.query.userId
  const foundedUser = userModels.find(user => id === userId)
  return foundedUser
}

module.exports = {
  getUser,
  getUserById
}