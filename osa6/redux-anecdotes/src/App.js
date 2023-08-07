import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer';


const App = () => {
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

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
