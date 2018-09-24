'use strict'

const express = require('express')
const router = express.Router()
const articleController = require('./../controllers/articleController')
const isLogin= require ('./../middlewares/isLogin')

router.post('/create', isLogin,articleController.createNew)
router.get('/display', articleController.findAll)
router.get('/display/:id', articleController.showOne)
router.put('/update', isLogin, articleController.updateOne)
router.delete('/delete', isLogin,articleController.deleteOne)


module.exports = router