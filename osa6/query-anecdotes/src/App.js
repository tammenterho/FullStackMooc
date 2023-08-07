import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {  useMutation, useQuery, useQueryClient } from 'react-query'
import {  getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch(`anecdote '${anecdote.content}' voted`)
    }
  })
  
  const handleVote = (anecdote) => {
    console.log('vote ' + anecdote.id)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }


const result = useQuery('anecdotes', getAnecdotes, {retry: 1})
  console.log(result)

  const anecdotes = result.data

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError) {
    return <div>Errori tuli</div>
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
