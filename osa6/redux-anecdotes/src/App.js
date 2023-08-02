import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  )
}

export default App;
