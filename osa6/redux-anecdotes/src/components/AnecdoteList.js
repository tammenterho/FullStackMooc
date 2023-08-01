import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const anecdotes = useSelector((state) =>
      state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    );
  
    const vote = (id) => {
      console.log('vote', id);
      dispatch(voteAction(id));
    };
  
    return (
      <div>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default AnecdoteList;
