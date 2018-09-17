const Article = require('./../models/article')

module.exports = {

    createNew: function (req, res) {
        
        const newArticle = new Article({
            title: req.body.title,
            author: req.body.author,
            content: req.body.content
        })

        newArticle.save(function (err, data) {
            if (!err) {
                res.status(201).json({
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    findAll: function (req, res) {
        Article.find(function (err, data) {
            if (!err) {
                res.status(200).json({
                    data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    updateOne: function (req, res) {
        let newUpdate = {
            title: req.body.title,
            author: req.body.author,
            content: req.body.content
        }

        Article.updateOne({
            _id: objId(req.params.id)
        }, newUpdate, function (err, data) {
            if (!err) {
                res.status(200).json({
                    msg: "Data has been updated",
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    deleteOne: function (req, res) {
        Article.deleteOne({
            _id: req.params.id
        }, function (err) {
            if (!err) {
                res.status(200).json({
                    "success": true,
                    "message": `Article with id ${Article._id} deleted`
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

}