process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
chai.use(chaiHttp)

describe('User', function () {

    var tempToken = ''
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
                        tempToken = token
                        done()
                    } else {
                        console.log(err)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    });

    afterEach(function (done) {
        User.deleteOne({}, function (err) {
            done()
        });
    });

    describe('User', function () {
        it('POST / should return the created user', function (done) {
            chai.request(app)
                .post('users/register')
                .type('form')
                .send({
                    name: 'andry',
                    email: 'andry_jns@yahoo.com',
                    password: 'andry'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201)
                    expect(res.body.data).to.be.a('object')
                    expect(res.body.data).to.have.property('email').with.lengthOf(16)
                    expect(res.body.data).to.have.property('password')
                    expect(res.body.data.name).to.equal('andry')
                    done()
                })
        })
    })

    describe('User', function() {
        it('POST / should return an object with token, user name, and user email', function(done) {
          chai.request(app)
            .post('/users/login')
            .type('form')
            .send({
              email: 'admin@mail.com',
              password: 'admin'
            })
            .end(function(err, res) {
              expect(res).to.have.status(200)
              expect(res.body).to.be.a('object')
              expect(res.body).to.have.property('email').with.lengthOf(14)
              expect(res.body).to.have.property('token')
              expect(res.body.user).to.equal('admin')
              done()
            })
        })
      })

})