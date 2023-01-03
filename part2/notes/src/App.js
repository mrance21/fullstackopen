import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      /* Logging in the user and setting the user to the state. */
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNotes = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > .5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNewNotes = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  // const loginForm = () => {
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input 
  //         type={"text"}
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}/>
  //     </div>
  //     <div>
  //       password
  //       <input 
  //       type={"text"}
  //       value={password}
  //       name="Password"
  //       onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type='submit'>login</button>
  //   </form>
  // }

  // const noteForm = () => {
  //   <form onSubmit={addNotes}>
  //     new note: <input value={newNote} onChange={handleNewNotes}/>
  //     <button type="submit">save</button>
  //   </form>
  // }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user === null 
        ? <LoginForm handleLogin={handleLogin} username={username} 
        setUsername={setUsername} password={password} setPassword={setPassword}/>
        : <div>
          <p>{user.name} logged-in</p>
          <NoteForm addNotes={addNotes} newNote={newNote} handleNewNotes={handleNewNotes}/>
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />)}
      </ul>
      
      <Footer />
    </div>
  )
}

export default App
