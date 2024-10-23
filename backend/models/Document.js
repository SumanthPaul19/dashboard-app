const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate document with the user
  fileName: { type: String, required: true }, // Store the name of the uploaded file
  filePath: { type: String, required: true }, // Store the path to the file
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);
