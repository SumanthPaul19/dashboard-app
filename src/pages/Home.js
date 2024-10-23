import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editNote, setEditNote] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);  // Add a reference to the file input

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchNotes();
      fetchDocuments();
    }
  }, [user, navigate]);

  const fetchNotes = async () => {
    const userId = user._id;
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/${userId}`);
      setNotesList(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchDocuments = async () => {
    const userId = user._id;
    try {
      const response = await axios.get(`http://localhost:5000/api/documents/${userId}`);
      setFilesList(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSaveNote = async () => {
    if (note.trim()) {
      const userId = user._id;
      try {
        const response = await axios.post('http://localhost:5000/api/notes', { userId, text: note });
        setNotesList([...notesList, response.data]);
        setNote('');
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  const handleSaveFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user._id);

      try {
        const response = await axios.post('http://localhost:5000/api/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setFilesList([...filesList, response.data]);
        setFile(null);  // Clear the file state
        fileInputRef.current.value = '';  // Clear the file input field after upload
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    }
  };

  const handleDownloadFile = async (fileId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/documents/download/${fileId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDeleteFile = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`);
      setFilesList(filesList.filter(file => file._id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleEditNote = (id, text) => {
    setIsEditing(id);
    setEditNote(text);
  };

  const handleUpdateNote = async (id) => {
    if (editNote.trim()) {
      try {
        const response = await axios.put(`http://localhost:5000/api/notes/${id}`, { text: editNote });
        if (response.status === 200) {
          setNotesList(notesList.map(note => (note._id === id ? { ...note, text: editNote } : note)));
          setIsEditing(null);
          setEditNote('');
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotesList(notesList.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="home-container">
      <h2>Welcome, {user.firstName || user.email}</h2>

      <div className="content-container">
        {/* Notes Section */}
        <div className="notes-section">
          <h3>Notes</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note here..."
          />
          <button onClick={handleSaveNote}>Save Note</button>

          <table className="notes-table">
            <thead>
              <tr>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notesList.map((note) => (
                <tr key={note._id}>
                  <td>
                    {isEditing === note._id ? (
                      <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                      />
                    ) : (
                      <p>{note.text}</p>
                    )}
                  </td>
                  <td>
                    {isEditing === note._id ? (
                      <>
                        <button onClick={() => handleUpdateNote(note._id)}>Update</button>
                        <button onClick={() => { setIsEditing(null); setEditNote(''); }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditNote(note._id, note.text)}>Edit</button>
                        <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Documents Section */}
        <div className="documents-section">
          <h3>Documents</h3>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileInputRef}  // Attach the file input ref here
          />
          <button onClick={handleSaveFile}>Upload Document</button>

          <table className="documents-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filesList.map((file) => (
                <tr key={file._id}>
                  <td>{file.fileName}</td>
                  <td>
                    <button onClick={() => handleDownloadFile(file._id, file.fileName)}>Download</button>
                    <button onClick={() => handleDeleteFile(file._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
