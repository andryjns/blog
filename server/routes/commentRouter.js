'use strict'

const express = require('express')
const router = express.Router()
const commentController = require('./../controllers/commentController')
const isLogin= require ('./../middlewares/isLogin')

router.post('/create', isLogin,commentController.createNew)
router.get('/display', commentController.findAll)
router.delete('/delete', isLogin,commentController.deleteOne)


module.exports = router