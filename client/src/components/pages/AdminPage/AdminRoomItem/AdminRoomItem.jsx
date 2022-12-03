import { Chip } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import MyAccardion from '../../../UI/MyAccardion/MyAccardion'
import MyModal from '../../../UI/MyModal/MyModal'
import RoomCard from '../../../UI/RoomCard/RoomCard'
import RoomCardWrapper from '../../../UI/RoomCardWrapper/RoomCardWrapper'
import TextButton from '../../../UI/TextButton/TextButton'

const AdminRoomItem = ({ room, fullBooks }) => {
  const [showBookings, setShowBookings] = useState(false)
  const currentBookings = fullBooks.filter((book) => book.roomId === room.id)
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
