const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Assuming you have a Note model

// Create a note
router.post('/', async (req, res) => {
  const { userId, text } = req.body;

  try {
    const newNote = new Note({ userId, text });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err.message });
  }
});

// Get notes for a user
router.get('/:userId', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

// Update a note (Add this PUT route)
router.put('/:id', async (req, res) => {
  const { text } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { text }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note', error: err.message });
  }
});

module.exports = router;
