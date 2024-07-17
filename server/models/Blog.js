const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
