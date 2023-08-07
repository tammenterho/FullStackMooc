import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  updateAnecdote } from '../reducers/anecdoteReducer';
import { clearNotification, setNotification } from '../reducers/notificationReducer';
import Notification from '../components/Notification'




//useSelector seuraa komponentin tilan muutoksia ja päivittää komponentin aina kun jokin muuttuu
const AnecdoteList = () => {
    const dispatch = useDispatch() //otetaan dispatch käyttöön, lähetetään action redux storeen
    const filter = useSelector((state) => state.filter) //useselector hakee filterin tilan reduxista
    const anecdotes = useSelector((state) =>
  state.anecdotes
    .filter((anecdote) =>
      anecdote.content && typeof anecdote.content === 'string'
        ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
        : false
    )
    .sort((a, b) => b.votes - a.votes)
);


    
    /*
    const anecdotes = useSelector(function (state) {
    return state.anecdotes.filter(function (anecdote) {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
    });
    */

    const vote = (content) => {

        console.log('vote', content.id);

        dispatch(updateAnecdote(content));

        dispatch(setNotification(`you voted '${content.content}'`, 10))

        // Wait for 5 seconds using async/await and setTimeout
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const clearNotificationAfterDelay = async () => {
            await wait(5000); // Wait for 5 seconds (5000 milliseconds)
            dispatch(clearNotification());
        };
        clearNotificationAfterDelay();

        console.log(content);
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
            <Notification />
        </div>
    );
};

export default AnecdoteList;

