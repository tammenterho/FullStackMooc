import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')
  console.log("tässä pitäis olla typen sisältämät jutut:  " + type)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// moduulissa voi olla monta nimettyä eksportia
 /*
export const useAnotherHook = () => {
  // ...
}
*/