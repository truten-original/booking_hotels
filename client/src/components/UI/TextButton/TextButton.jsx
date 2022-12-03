import { Button } from '@mui/material'

const TextButton = ({ children, id, onClick, bg = false, fz, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        p: '5px, 10px',
        fontSize: fz || '14px',
        backgroundColor: bg ? '#eee' : '',
      }}
      onClick={() => {
        id ? onClick(id) : onClick()
      }}
    >
      {children}
    </Button>
  )
}

export default TextButton
