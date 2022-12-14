const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const authorization = async (req, res, next) => {
  // verify user is authenticated
  const { auth } = req.headers

  if (!auth) {
    return res.json({ error: 'Authorization token required' })
  }

  const token = auth.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.json({ error: 'Request is not authorized' })
  }
}

module.exports = authorization
