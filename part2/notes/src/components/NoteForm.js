import { useState } from 'react' 

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleNewNotes = (event) => {
    setNewNote(event.target.value)
  }

  const addNotes = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      // date: new Date().toISOString(),
      important: Math.random() > .5,
    })
    
    setNewNote('')
  }

  return (
    <>
     <h2>Create a new Note</h2>
      <form onSubmit={addNotes}>
        <input value={newNote} onChange={handleNewNotes}/>
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default NoteForm