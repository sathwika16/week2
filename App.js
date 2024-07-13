import React, { useState } from 'react';
import { Container, Form, Card, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteTitle = formData.get('note-title');
    const noteContent = formData.get('note-content');

    if (editMode) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id ? { ...note, title: noteTitle, content: noteContent } : note
        )
      );
      setEditMode(false);
      setCurrentNote({ id: null, title: '', content: '' });
    } else {
      // Add new note
      if (noteTitle || noteContent) {
        setNotes([...notes, { id: notes.length + 1, title: noteTitle, content: noteContent }]);
      }
    }

    event.target.reset();
  };

  const handleEditNote = (note) => {
    setEditMode(true);
    setCurrentNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container>
        <header>
          <h1>Google Keep Clone</h1>
          <ToggleButtonGroup type="checkbox" className="mb-2">
            <ToggleButton
              id="dark-mode-toggle"
              type="checkbox"
              variant="outline-secondary"
              checked={darkMode}
              value="1"
              onChange={handleDarkModeToggle}
            >
              Dark Mode
            </ToggleButton>
          </ToggleButtonGroup>
        </header>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="noteForm">
            <Form.Control name="note-title" type="text" placeholder="Title" defaultValue={currentNote.title} />
            <Form.Control name="note-content" as="textarea" rows={3} placeholder="Take a note..." defaultValue={currentNote.content} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editMode ? 'Update Note' : 'Add Note'}
          </Button>
        </Form>

        <div className="notes-list">
          {notes.map((note) => (
            <Card key={note.id} className="note-card">
              <Card.Body>
                <Card.Title><strong>{note.title}</strong></Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Button variant="info" onClick={() => handleEditNote(note)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteNote(note.id)} className="ml-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
