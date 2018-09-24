process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Article = require('../models/article')
const jwt = require('jsonwebtoken')
chai.use(chaiHttp)

describe('Article', function () {
    var testToken = ''
    var articleId = ''

    beforeEach(function (done) {
        User.create({
                name: 'admin',
                email: 'admin@mail.com',
                password: 'admin'
            })
            .then(function (user) {
                jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.JWT_KEY, function (err, token) {
                    if (!err) {
                        testToken = token
                        console.log(testToken)

                        Article.create({
                                title: 'Test Article',
                                userId: user._id,
                                content: 'Tester text',
                                comments: []
                            })
                            .then(function (article) {
                                articleId = article._id
                                done()
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        console.log(err)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    })

    afterEach(function (done) {
        User.deleteOne({}, function (err) {
            Article.deleteOne({}, function (err) {
                done()
            })
        })
    })

    describe('Article', function () {
        it('GET / should return all saved articles', function (done) {
            chai.request(app)
                .get('/articles/display')
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body.data).to.be.a('array')
                    done()
                })
        })
    })

    describe('Article', function () {
        it('POST / should create new article', function (done) {
            chai.request(app)
                .post('/articles/create')
                .set('token', testToken)
                .send({
                    title: 'Second test article',   
                    content: 'Tester two content',
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body.data).to.have.property('title')
                    expect(res.body.data.title).to.equal('Second test article')
                    done()
                })
        })
    })
    describe('Article', function () {
        it('DELETE / should return a success message', function (done) {
            chai.request(app)
                .delete('/articles/delete')
                .set('token', testToken)
                .send({
                    id: articleId
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal(`Article with id ${Article._id} deleted`)
                    done()
                })
        })
    })
    describe('Article', function () {
        it('PUT / should return a success message and revised article', function (done) {
            chai.request(app)
                .patch('/articles/update')
                .set('token', testToken)
                .send({
                    title: 'Article is updated!',
                    content: 'Content is updated',
                    id: articleId
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.have.property('title')
                    expect(res.body.data).to.have.property('content')
                    expect(res.body.message).to.equal('Data has been updated')
                    expect(res.body.data.title).to.equal('Article is updated!')
                    expect(res.body.data.content).to.equal('Content is updated')
                    done()
                })
        })
    })
})