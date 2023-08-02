import { useSelector, useDispatch } from 'react-redux';
import { createAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdoteAction(content));
    }

    /*
ilman nuolta

        function create(event) {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdoteAction(content));
}

    */

    return (
        <div>
            <h1>Create New</h1>
            <form onSubmit={create}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;