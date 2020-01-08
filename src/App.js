import React, {useState, useEffect} from 'react';
import NoteBox from './notebox';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
  const initialState = JSON.parse(window.localStorage.getItem('notes')) || [{createdOn: new Date(),edit:true}];
  const [notes, setNotes] = useState(initialState);

  useEffect(()=> {window.localStorage.setItem('notes', JSON.stringify(notes))},[notes]);

  const addNote = () => {
    const tempNotes = [...notes];
    const result = {createdOn: new Date(), edit:true};
    tempNotes.push(result);
    setNotes(tempNotes);
  }

  const onDelete = idx => {
    const tempNotes = [...notes];
    tempNotes.splice(idx,1);
    setNotes(tempNotes)
  }

  const createNotesBox = () => {
    return notes.map((note, idx) => (
      <NoteBox
        key={note.createdOn}
        note={note}
        idx = {idx}
        onDelete = {()=> onDelete(idx)}
      />
    )
    )
  }
  return (
    <>
    <div className="App">
      <header className="App-header">
      React Note
      </header>
      <button className="new-note" onClick={() => addNote()}><FontAwesomeIcon icon={faPlusSquare} /></button>
      <br/>
      <div className="note-section">
      {createNotesBox()}
      </div>
    </div>
    </>
  );
}

export default App;
