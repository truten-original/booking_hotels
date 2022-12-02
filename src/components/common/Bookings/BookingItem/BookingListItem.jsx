import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { removeBooking } from '../../../../store/bookingsSlice'
import { getRoom } from '../../../../store/roomsSlice'
import { getStringDate } from '../../../../utils/getStringDate'
import RoomCard from '../../../UI/RoomCard/RoomCard'
import RoomCardWrapper from '../../../UI/RoomCardWrapper/RoomCardWrapper'
import TextButton from '../../../UI/TextButton/TextButton'

const BookingListItem = ({ book }) => {
  const dispatch = useDispatch()
  const deleteBooking = (id) => {
    dispatch(removeBooking(id))
  }
  const room = useSelector(getRoom(book.roomId))
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
        <Typography
          sx={{ color: '#9c2780', textAlign: 'center' }}
        >{`${getStringDate(book.arrivalDate)} - ${getStringDate(
          book.departureDate
        )}`}</Typography>
        <TextButton onClick={deleteBooking} id={book.id} color="secondary">
          отказаться от бронирования
        </TextButton>
      </Box>
    </RoomCardWrapper>
  )
}

export default BookingListItem
