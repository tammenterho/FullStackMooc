import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"




const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const votedAnecdote = action.payload
      const id = votedAnecdote.id
      return state
      .map(a => a.id !== id ? a : votedAnecdote)
      .sort((a,b) => b.votes - a.votes)
  },

  setAnecdotes(state, action) {
    return action.payload
      .sort((a,b) => b.votes - a.votes)
  },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = content => {
  console.log("tämä on reducerissa: ", JSON.stringify(content));
  return async dispatch => {
    const updatedAnecdote = {
      ...content,
      votes: content.votes + 1
    }
    console.log('tämä on päivitetty anekdootti: ', JSON.stringify( updatedAnecdote))
    const updated = await anecdotesService.update(content.id, updatedAnecdote)
    console.log('tämä on updated' + updated)
    dispatch(voteAnecdote(updated))
  }
}

export default anecdoteSlice.reducer

