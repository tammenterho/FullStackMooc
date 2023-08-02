import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';
import Notification from '../components/Notification'


//useSelector seuraa komponentin tilan muutoksia ja päivittää komponentin aina kun jokin muuttuu
const AnecdoteList = () => {
    const dispatch = useDispatch() //otetaan dispatch käyttöön, lähetetään action redux storeen
    const filter = useSelector((state) => state.filter) //useselector hakee filterin tilan reduxista
    const anecdotes = useSelector((state) =>
        state.anecdotes
            .filter((anecdote) =>
                anecdote.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes) // Järjestetään votesin mukaan laskevassa järjestyksessä
    );

    /*
    const anecdotes = useSelector(function (state) {
    return state.anecdotes.filter(function (anecdote) {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
    });
    */

    const vote = (id, content) => {
        console.log('vote', id);
        dispatch(voteAnecdote(id));
        dispatch(notify(content, id))
        console.log(content)
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            ))}
            <Notification />
        </div>
    );
};

export default AnecdoteList;

/*
useSelector ottaa aina state ja palauttaa

const result = useSelector(selectorFunction);

const initialState = {
  user: {
    name: "John Doe",
    age: 30,
  },
  todos: [
    { id: 1, text: "Do the laundry", done: false },
    { id: 2, text: "Buy groceries", done: true },
  ],
};


import { useSelector } from 'react-redux';

const MyComponent = () => {
  const user = useSelector(state => state.user);
  
  // Voit käyttää user-muuttujaa komponentissa
  console.log(user.name); // Tulostaa "John Doe"
  console.log(user.age); // Tulostaa 30

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};
useSelector-hooki hakee ainoastaan sen osan tilasta, 
jota olet määritellyt selectorFunction-funktiossa. 
Tämän ansiosta voit valikoida Reduxin tilasta vain ne tiedot, 
jotka ovat kyseiselle komponentille tarpeellisia.

*/