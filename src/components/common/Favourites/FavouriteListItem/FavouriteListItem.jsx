import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../../../UI/RoomCard/RoomCard'
import RoomCardWrapper from '../../../UI/RoomCardWrapper/RoomCardWrapper'
import TextButton from '../../../UI/TextButton/TextButton'
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
        <FavouriteIcon roomId={room.id} />
        <TextButton onClick={bookingHandleClick} id={room.id} color="secondary">
          забронировать
        </TextButton>
      </Box>
    </RoomCardWrapper>
  )
}

export default FavouriteListItem
