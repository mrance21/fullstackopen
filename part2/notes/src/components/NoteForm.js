const NoteForm = ({ addNotes, newNote, handleNewNotes }) => {
  return (
    <form onSubmit={addNotes}>
    new note: <input value={newNote} onChange={handleNewNotes}/>
    <button type="submit">save</button>
  </form>
  )
}

export default NoteForm