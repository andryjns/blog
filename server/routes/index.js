'use strict'

const express = require('express')
const router = express.Router()

const user = require('./userRouter')
const article = require('./articleRouter')
const comment = require('./commentRouter')

router.use('/users', user)
router.use('/articles', article)
router.use('/comments', comment)


module.exports = router