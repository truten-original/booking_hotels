import { Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import RoomFacilities from '../../common/RoomFacilities'
import {
  getCurrentType,
  getTypesLoadingStatus,
} from '../../../store/typesSlice'

const RoomDescription = ({ description, facilitiesArr }) => {
  const isLoading = useSelector(getTypesLoadingStatus)
  const currentType = useSelector(getCurrentType(description))
  return (
    <>
      {!isLoading && (
        <Box
          sx={{
            backgroundColor: '#eee',
            borderRadius: '10px',
            p: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            gridArea: 'descrip',
          }}
        >
          <Typography>{currentType.description}</Typography>
          <Typography variant="h6">Удобства:</Typography>
          <RoomFacilities facilitiesArr={facilitiesArr} />
        </Box>
      )}
    </>
  )
}

export default RoomDescription
