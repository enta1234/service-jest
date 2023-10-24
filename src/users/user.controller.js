const userFunc = require('./user.func')

const getUser = (req, res) => {
  const users = userFunc.findUser()
  if (!users) {
    return res.status(404).json({
      isSuccess: false,
      message: 'data not found',
      data: []
    })
  }

  const ret = {
    isSuccess: true,
    message: 'success',
    data: userFunc.findUser()
  }

  return res.json(ret)
}

const getUserById = (req, res) => {
  const userId = req.params.userId
  try {
    const foundedUser = userFunc.findUserById(userId)
    if (!foundedUser) {
      return res.status(404).json({
        isSuccess: false,
        message: 'data not found',
        data: []
      })
    } else {
      const ret = {
        isSuccess: true,
        message: 'success',
        data: [foundedUser]
      }
      return res.json(ret)
    }
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({
      isSuccess: false,
      message: 'internal server error',
      data: []
    })
  }
}

module.exports = {
  getUser,
  getUserById
}