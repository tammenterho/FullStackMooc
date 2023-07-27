const initialState = {
  good: 5,
  ok: 4,
  bad: 2
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
     return  {...state, good: state.good + 1}
    case 'BAD':
      return state
    case 'ZERO':
      return state
    default: return state
  }
  
}

export default counterReducer
