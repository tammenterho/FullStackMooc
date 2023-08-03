import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import anecdotes from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
    useEffect(() => {
        anecdotes
            .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App;
