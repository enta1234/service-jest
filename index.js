const express = require('express')
const app = express()

const router = require('./src/routers.js')
app.use(router)

app.listen(3000, () => console.log('Server start at PORT: 3000'))

module.exports = app
