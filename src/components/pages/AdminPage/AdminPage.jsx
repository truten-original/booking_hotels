import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFullInfoBookings } from '../../../store/bookingsSlice'
import { getRoomsWithBookingStatus } from '../../../store/roomsSlice'
import ContentLayout from '../../UI/ContentLayout/ContentLayout'
import ItemsContainer from '../../UI/ItemsContainer/ItemsContainer'
import MyToogleButton from '../../UI/MyToogleButton/MyToogleButton'
import AdminRoomItem from './AdminRoomItem/AdminRoomItem'

const AdminPage = () => {
  const [value, setValue] = useState('bookingRooms')
  const [currentGroup, setCurrentGroup] = useState(null)
  const fullInfoBooks = useSelector(getFullInfoBookings)
  const roomsWithBookingStatus = useSelector(getRoomsWithBookingStatus)
  const fields = [
    { name: 'все бронирования', value: 'bookingRooms' },
    { name: 'свободные номера', value: 'freeRooms' },
  ]
  const getCurrentGroup = (v) => {
    switch (v) {
      case 'bookingRooms':
        const allBookingsRooms = roomsWithBookingStatus.filter(
          (room) => room.booking !== false
        )
        const resArr = []
        for (const book of allBookingsRooms) {
          if (!resArr.find((item) => item.id === book.id)) {
            resArr.push(book)
          }
        }
        setCurrentGroup(resArr)
        break
      case 'freeRooms':
        setCurrentGroup(
          roomsWithBookingStatus.filter((room) => room.booking === false)
        )
        break
      default:
        break
    }
    return currentGroup
  }
  useEffect(() => {
    getCurrentGroup(value)
  }, [value, roomsWithBookingStatus])
  const handleChange = (v) => setValue(v)
  return (
    <ContentLayout>
      <MyToogleButton
        fields={fields}
        value={value}
        handleChange={handleChange}
      />
      <ItemsContainer>
        {currentGroup?.map((room) => (
          <AdminRoomItem key={room.id} room={room} fullBooks={fullInfoBooks} />
        ))}
      </ItemsContainer>
    </ContentLayout>
  )
}

export default AdminPage
