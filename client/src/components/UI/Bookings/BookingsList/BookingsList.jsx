import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import {
  getBookingLoadingStatus,
  getCurrentUserBookings,
} from '../../../../store/bookingsSlice'
import { getAuthId } from '../../../../store/usersSlice'
import ContentLayout from '../../../common/ContentLayout/ContentLayout'
import Loader from '../../../common/Loader/Loader'
import BookingListItem from '../BookingItem/BookingListItem'

const BookingsList = () => {
  const bookLoadingStatus = useSelector(getBookingLoadingStatus)
  const id = useSelector(getAuthId)
  const bookings = useSelector(getCurrentUserBookings(id))
  return (
    <ContentLayout>
      {!bookLoadingStatus ? (
        <>
          <Typography sx={{ color: '#eee' }} variant="h6">
            {bookings.length
              ? 'ваши бронирования'
              : 'список бронированний пуст '}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '2vh' }}>
            {bookings.map((book) => (
              <BookingListItem key={book._id} book={book} />
            ))}
          </Box>
        </>
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
    </ContentLayout>
  )
}

export default BookingsList
