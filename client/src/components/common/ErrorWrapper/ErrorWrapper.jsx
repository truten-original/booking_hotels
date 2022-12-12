import { Typography } from '@mui/material'

const ErrorWrapper = ({ children }) => {
  return (
    <Typography
      sx={{
        bgcolor: '#fff',
        color: 'red',
        textAlign: 'center',
        mb: '10px',
        p: '10px 5px',
        borderRadius: '10px',
      }}
    >
      {children}
    </Typography>
  )
}

export default ErrorWrapper
