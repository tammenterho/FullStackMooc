import { createSlice } from "@reduxjs/toolkit"

const initialState = 'VOTE ANECDOTE'


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notify(state, action) {
            const content = action.payload
            return 'you voted anecdote: ' + content
        }
    }
})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer