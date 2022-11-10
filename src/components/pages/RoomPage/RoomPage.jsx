import { Box, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getCurrentRoom,
  getRoomsLoadingStatus,
} from '../../../store/roomsSlice'
import BookingForm from '../../common/BookingForm/BookingForm'
import CommentForm from '../../common/Comments/CommentForm/CommentForm'
import CommentWrapper from '../../common/Comments/CommentWrapper/CommentWrapper'
import RoomDescription from '../../common/RoomDescription/RoomDescription'
import ImagesSlider from '../../common/Slider/ImagesSlider'
import RoomFacilities from '../../UI/RoomFacilities/RoomFacilities'

const RoomPage = () => {
  const { roomId } = useParams()
  const currentRoom = useSelector(getCurrentRoom(roomId))
  const isLoading = useSelector(getRoomsLoadingStatus())
  return (
    <Container className="card_container">
      {!isLoading && (
        <>
          <Box className="slider_container">
            <ImagesSlider images={currentRoom.images} size="100%" />
          </Box>
          <RoomDescription
            description={currentRoom?.type}
            facilitiesArr={currentRoom?.facilities}
          />
          <CommentWrapper />
          <BookingForm room={currentRoom} />
        </>
      )}
    </Container>
  )
}

export default RoomPage
