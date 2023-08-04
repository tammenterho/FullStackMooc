import { createSlice } from "@reduxjs/toolkit"

const initialState = 'VOTE AN ANECDOTE'


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notify(state, action) {
            state = action.payload
            return state
        },
        clearNotification (state, action) {
            return null
        }
    }
})



export const { notify, clearNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(notify(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer