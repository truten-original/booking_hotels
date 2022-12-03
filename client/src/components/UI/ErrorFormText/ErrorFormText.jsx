import { Typography } from '@mui/material'

const ErrorFormText = ({ message }) => {
  return <Typography sx={{ color: 'red' }}>{message}</Typography>
}

export default ErrorFormText
