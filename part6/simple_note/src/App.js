import { useEffect } from 'react'
import NewNote from "./component/NewNote";
import Notes from "./component/Notes";
import VisibilityFilter from "./component/VisibilityFilter";
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])
  

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}


export default App;
