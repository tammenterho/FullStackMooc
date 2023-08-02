import { createSlice } from "@reduxjs/toolkit"

const initialState = 'VOTE AN ANECDOTE'


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notify(state, action) {
            const content = action.payload
            return content
        },
        clearNotification (state, action) {
            return null
        }
    }
})



export const { notify, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer