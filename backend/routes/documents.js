const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Document = require('../models/Document');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Ensure the uploads directory exists
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload a document
router.post('/', upload.single('file'), async (req, res) => {
  const { userId } = req.body;

  try {
    const newDocument = new Document({
      userId,
      fileName: req.file.originalname,
      filePath: req.file.path
    });

    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err) {
    console.error('Error uploading document:', err);
    res.status(500).json({ message: 'Error uploading document', error: err.message });
  }
});

// Get documents for a user
router.get('/:userId', async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.params.userId });
    res.status(200).json(documents);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ message: 'Error fetching documents', error: err.message });
  }
});

// Download a document
router.get('/download/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.resolve(__dirname, '..', document.filePath); // Ensure correct absolute path
    console.log('Downloading file:', filePath); // Log file path for debugging

    res.download(filePath, document.fileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        return res.status(500).json({ message: 'Error downloading file', error: err.message });
      }
    });
  } catch (err) {
    console.error('Error downloading document:', err);
    res.status(500).json({ message: 'Error downloading document', error: err.message });
  }
});

// Delete a document
router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.resolve(__dirname, '..', document.filePath); // Ensure correct absolute path
    console.log('Deleting file:', filePath); // Log file path for debugging

    // Delete the file from the filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file', error: err.message });
      }

      // Delete the document entry from the database
      await Document.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Document deleted' });
    });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ message: 'Error deleting document', error: err.message });
  }
});

module.exports = router;
