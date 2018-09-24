const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
}, {
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema)

module.exports = Article