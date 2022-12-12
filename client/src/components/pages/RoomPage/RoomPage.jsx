import { Box, Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getBookingLoadingStatus,
  loadCurrentRoomBookings,
} from '../../../store/bookingsSlice'
import {
  getCurrentRoom,
  getRoomsLoadingStatus,
} from '../../../store/roomsSlice'
import BookMarkForm from '../../UI/Bookmarks/BookamrkForm'
import BookingForm from '../../UI/Bookings/BookingForm'
import CommentWrapper from '../../UI/Comments/CommentWrapper'
import RoomDescription from '../../UI/RoomDescription'
import ImagesSlider from '../../UI/Slider/ImagesSlider'

const RoomPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCurrentRoomBookings(roomId))
  }, [])
  const { roomId } = useParams()
  const currentRoom = useSelector(getCurrentRoom(roomId))
  const isLoading = useSelector(getRoomsLoadingStatus)
  const isLoadingCurrentBooking = useSelector(getBookingLoadingStatus)
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
          <BookMarkForm roomId={roomId} />
          <CommentWrapper roomId={roomId} />
          {!isLoadingCurrentBooking && <BookingForm room={currentRoom} />}
        </>
      )}
    </Container>
  )
}

export default RoomPage
