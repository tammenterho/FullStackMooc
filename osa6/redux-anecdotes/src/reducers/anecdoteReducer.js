import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
 /*
tai näin jolloin asObejctia ei tarvita

const anecdotesAtStart = [
  {
    content: "If it hurts, do it more often",
    id: Math.random().toFixed(0),
    votes: 0
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: Math.random().toFixed(0),
    votes: 0
  },
  // Muut anekdootit...
];

 */
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
// Käy taulukon läpi ja tekee jokaisesta anekdootti objektin
// initialState on tila, joka on taulukko, joka sisältää anekdootit objekteina

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return changedAnecdote
    },

     createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    }
  }
})

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*
const updatedState = ... -rivi suoritetaan, joka päivittää tilan (state) map-funktion avulla. 
Map-funktio käy läpi jokaisen anekdootin tilassa ja tarkistaa, onko anekdootin 
id sama kuin actionin id. Jos ne ovat samat, luodaan uusi anekdootti-objekti 
kopioimalla vanha objekti levyn operaattorilla (...anecdote) ja päivittämällä 
äänten määrä (votes) yhdellä lisäämällä 1: votes: anecdote.votes + 1. 
Jos id ei vastaa, palautetaan alkuperäinen anekdootti-objekti muuttumattomana: anecdote.
*/

