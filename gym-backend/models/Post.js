const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Workout', 'Nutrition', 'Recovery', 'Lifestyle'], default: 'Workout' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { type: String }, // URL to the blog thumbnail
  content: { type: String, required: true },
  readTime: { type: String },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);