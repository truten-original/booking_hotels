import { Typography } from '@mui/material'

const RoomPrice = ({ price }) => {
  return (
    <p>
      стоимость:
      <Typography
        component="span"
        align="inherit"
        sx={{
          backgroundColor: '#ecdbbb',
          borderRadius: '10px',
          width: 'fit-content',
          px: '5px',
        }}
      >
        {price}
      </Typography>
      руб/сутки
    </p>
  )
}

export default RoomPrice
