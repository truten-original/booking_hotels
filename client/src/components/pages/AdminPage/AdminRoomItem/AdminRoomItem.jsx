import { Chip } from '@mui/material'
import { Box } from '@mui/system'
import { useToggle } from '../../../../hooks/useToggle'
import MyAccardion from '../../../common/MyAccardion'
import MyModal from '../../../common/MyModal'
import RoomCard from '../../../common/RoomCard'
import RoomCardWrapper from '../../../common/RoomCardWrapper'
import TextButton from '../../../common/TextButton'

const AdminRoomItem = ({ room, fullBooks }) => {
  const [showBookings, setShowBookings] = useToggle(false)
  const currentBookings = fullBooks.filter((book) => book.roomId === room._id)
  const handleClick = () => {
    setShowBookings(true)
  }
  return (
    <>
      <MyModal visible={showBookings} setVisible={setShowBookings}>
        {currentBookings.length && <MyAccardion items={currentBookings} />}
      </MyModal>
      <Box sx={{ pointerEvents: showBookings ? 'none' : 'auto' }}>
        <RoomCardWrapper>
          <RoomCard room={room} facilities={false} />
          {currentBookings.length ? (
            <TextButton onClick={handleClick} color="secondary">
              список бронирований
            </TextButton>
          ) : (
            <Chip label="нет бронирований" color="success" variant="outlined" />
          )}
        </RoomCardWrapper>
      </Box>
    </>
  )
}

export default AdminRoomItem
