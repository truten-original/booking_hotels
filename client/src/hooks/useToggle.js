import { useState } from 'react'

function useToggle(intialValue) {
  const [value, setValue] = useState(intialValue)
  const toggle = () => {
    setValue(!value)
  }
  return [value, toggle]
}
export { useToggle }
