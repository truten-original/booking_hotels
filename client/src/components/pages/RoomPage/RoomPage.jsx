import { Box, Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getBookingLoadingStatus,
  loadCurrentRoomBookings,
} from '../../../store/bookingsSlice'
import { getBookmarksLoadingStatus } from '../../../store/bookmarksSlice'
import {
  getCommentsLoadingStatus,
  loadComments,
} from '../../../store/commentsSlice'
import { getFacilitiesLoadingStatus } from '../../../store/facilitiesSlice'
import {
  getCurrentRoom,
  getRoomsLoadingStatus,
} from '../../../store/roomsSlice'
import Loader from '../../common/Loader/Loader'
import BookingForm from '../../UI/Bookings/BookingForm'
import BookMarkForm from '../../UI/Bookmarks/BookamrkForm'
import CommentWrapper from '../../UI/Comments/CommentWrapper'
import RoomDescription from '../../UI/RoomDescription'
import ImagesSlider from '../../UI/Slider/ImagesSlider'

const RoomPage = () => {
  const dispatch = useDispatch()

  const { roomId } = useParams()
  const currentRoom = useSelector(getCurrentRoom(roomId))
  const isLoadingRooms = useSelector(getRoomsLoadingStatus)
  const isLoadingCurrentBooking = useSelector(getBookingLoadingStatus)
  const isLoadingBookmark = useSelector(getBookmarksLoadingStatus)
  const isLoadingComments = useSelector(getCommentsLoadingStatus)
  const isLoadingFacils = useSelector(getFacilitiesLoadingStatus)
  useEffect(() => {
    dispatch(loadCurrentRoomBookings(roomId))
    dispatch(loadComments(roomId))
  }, [dispatch, roomId])
  return (
    <>
      {!isLoadingRooms &&
      !isLoadingCurrentBooking &&
      !isLoadingBookmark &&
      !isLoadingComments &&
      !isLoadingFacils ? (
        <Container className="card_container">
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
            <BookingForm room={currentRoom} />
          </>
        </Container>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '85vh',
          }}
        >
          <Loader width="350px" />
        </Box>
      )}
    </>
  )
}

export default RoomPage
