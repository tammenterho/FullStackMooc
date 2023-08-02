import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';


//useSelector seuraa komponentin tilan muutoksia ja päivittää komponentin aina kun jokin muuttuu
const AnecdoteList = () => {
    const dispatch = useDispatch() //otetaan dispatch käyttöön, lähetetään action redux storeen
    const filter = useSelector((state) => state.filter) //useselector hakee filterin tilan reduxista
    const anecdotes = useSelector((state) => //sama anecdooteille
        state.anecdotes.filter((anecdote) => //hakee vain ne joiden sisältö vastaa filterin arvoa
            anecdote.content.toLowerCase().includes(filter.toLowerCase()) //
        )
    );

    /*
    const anecdotes = useSelector(function (state) {
    return state.anecdotes.filter(function (anecdote) {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
    });
    */

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