import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, notify } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdote(content));
        dispatch(notify(content))

        // Wait for 5 seconds using async/await and setTimeout
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const clearNotificationAfterDelay = async () => {
            await wait(5000); // Wait for 5 seconds (5000 milliseconds)
            dispatch(clearNotification());
        };
        clearNotificationAfterDelay();

        console.log(content);
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