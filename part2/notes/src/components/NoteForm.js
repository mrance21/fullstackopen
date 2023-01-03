const NoteForm = ({ addNotes, newNote, handleNewNotes }) => {
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