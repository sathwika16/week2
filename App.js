import React, { useState } from 'react';
import { Container, Form, Card, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteText = formData.get('note-text');
    if (noteText) {
      setNotes([...notes, { id: notes.length + 1, text: noteText }]);
      event.target.reset();
    }
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
            <Form.Control name="note-text" as="textarea" rows={3} placeholder="Take a note..." required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Note
          </Button>
        </Form>

        <div className="notes-list">
          {notes.map((note) => (
            <Card key={note.id} className="note-card">
              <Card.Body>{note.text}</Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;