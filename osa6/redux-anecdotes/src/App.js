import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App;
