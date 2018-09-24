const Article = require('./../models/article')

module.exports = {

    createNew: function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            userId: req.decoded.id,
            content: req.body.content,
            comments: []
        })

        newArticle.save(function (err, data) {
            if (!err) {
                res.status(201).json({
                    message: 'Article has been created',
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
        Article.find()
            .populate('userId')
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'userId',
                    model: 'User'
                }
            })
            .exec((err, articles) => {
                if (!err) {
                    res.status(200).json({
                        message: 'All articles has been shown',
                        data: articles
                    })
                } else {
                    res.status(500).json({
                        message: err
                    })
                }
            })
    },

    updateOne: function (req, res) {
        Article.findOne({
            _id: req.body.id
        }, function (err, article) {
            if (!err) {
                if (article) {
                    if (article.userId == req.decoded.id) {
                        article.title = req.body.title
                        article.content = req.body.content
                        article.save()
                        res.status(200).json({
                            message: 'article edited successfully!',
                            data: article
                        })
                    } else {
                        res.status(500).json({
                            message: 'Invalid user'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'Invalid article'
                    })
                }
            } else {
                res.status(500).json({
                    message: err
                })
            }
        })
    },

    deleteOne: function (req, res) {
        Article.find({
            _id: req.body.id
        }, function (err, article) {
            if (!err) {
                if (article.length !== 0) {
                    if (article[0].userId == req.decoded.id) {
                        Article.deleteOne({
                            _id: req.body.id
                        }, function (err) {
                            if (!err) {
                                res.status(200).json({
                                    message: `Article with id ${Article._id} has been deleted`
                                })
                            } else {
                                res.status(500).json({
                                    message: err
                                })
                            }
                        })
                    } else {
                        res.status(500).json({
                            message: 'Invalid user'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'Invalid article'
                    })
                }
            } else {
                res.status(500).json({
                    message: err
                })
            }
        })
    },

    showOne: function (req, res) {
        Article.findOne({
                _id: req.params.id
            })
            .populate('userId')
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'userId',
                    model: 'User'
                }
            })
            .exec((err, article) => {
                if (!err) {
                    if (article) {
                        res.status(200).json({
                            message: 'Found the article',
                            data: article
                        })
                    } else {
                        res.status(500).json({
                            message: 'Article is not found'
                        })
                    }
                } else {
                    res.status(500).json({
                        message: err
                    })
                }
            })
    },
}