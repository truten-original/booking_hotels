import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getCurrentType } from '../../../store/typesSlice'

const RoomType = ({ type }) => {
  const currentType = useSelector(getCurrentType(type))
  return (
    <p>
      класс:
      <Typography
        component="span"
        align="inherit"
        sx={{
          backgroundColor: '#ffd1dc',
          borderRadius: '10px',
          width: 'fit-content',
          px: '5px',
          margin: '0',
        }}
      >
        {currentType?.name}
      </Typography>
    </p>
  )
}

export default RoomType
