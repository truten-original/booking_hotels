import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../../../common/RoomCard'
import RoomCardWrapper from '../../../common/RoomCardWrapper'
import TextButton from '../../../common/TextButton'
import FavouriteIcon from '../FavouriteIcon'
const FavouriteListItem = ({ room }) => {
  const navigate = useNavigate()
  const bookingHandleClick = (roomId) => navigate(`/rooms/${roomId}`)
  return (
    <RoomCardWrapper>
      <RoomCard room={room} facilities={true} />
      <Box
        sx={{
          border: '1px solid #9c2780',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        <FavouriteIcon roomId={room._id} />
        <TextButton
          onClick={bookingHandleClick}
          id={room._id}
          color="secondary"
        >
          забронировать
        </TextButton>
      </Box>
    </RoomCardWrapper>
  )
}

export default FavouriteListItem
