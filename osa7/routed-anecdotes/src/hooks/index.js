import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')
  console.log("tässä pitäis olla typen sisältämät jutut:  " + type)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = (event) => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

