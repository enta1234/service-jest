const userFunc = require('./user.func')

const getUser = async (req, res) => {
  try {
    const users = await userFunc.findUser()
    console.log('users: ', users);
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
      data: users
    }

    return res.json(ret)
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({
      isSuccess: false,
      message: 'internal server error',
      data: []
    })
  }
}

const getUserById =async (req, res) => {
  const userId = req.params.userId
  try {
    const foundedUser = await userFunc.findUserById(userId)
    console.log('foundedUser: ', foundedUser);
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