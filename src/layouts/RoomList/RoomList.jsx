import { Box, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import RoomItem from '../../components/UI/RoomItem'
import {
  getBookingLoadingStatus,
  getCurrentUserBookings,
  loadBookings,
} from '../../store/bookingsSlice'
import { loadBookmarks } from '../../store/bookmarksSlice'
import {
  getRooms,
  getRoomsLoadingStatus,
  getRoomsSortParams,
} from '../../store/roomsSlice'
import { getAuthId } from '../../store/usersSlice'
import { checkAvailableRooms } from '../../utils/checkAvailableRooms'
const RoomList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortParam, setSortParam] = useState('cheaper')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadBookings())
    dispatch(loadBookmarks())
  }, [dispatch])
  const userId = useSelector(getAuthId())
  const isLoadingBookings = useSelector(getBookingLoadingStatus())
  const isLoadingRooms = useSelector(getRoomsLoadingStatus())
  const isLoadingBookmarks = useSelector(getBookingLoadingStatus())
  const sortParams = useSelector(getRoomsSortParams())
  const books = useSelector(getCurrentUserBookings(userId))
  const { roomId } = useParams()
  const rooms = useSelector(getRooms(sortParam))
  const availableRooms = checkAvailableRooms(rooms, books)
  const filteredRooms = searchQuery
    ? availableRooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery)
      )
    : availableRooms
  if (rooms)
    return (
      <>
        {roomId ? (
          <Outlet />
        ) : (
          <Container
            sx={{ mt: '80px', height: !!rooms.length ? '100%' : '100vh' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <TextField
                color="secondary"
                label="Поиск"
                type="search"
                variant="standard"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                }}
                sx={{
                  mb: 2,
                  fontSize: '20px',
                  width: '33%',
                  backgroundColor: '#eee',
                  borderRadius: '10px',
                }}
              />
              <FormControl
                color="secondary"
                variant="standard"
                sx={{
                  m: 1,
                  minWidth: 210,
                  backgroundColor: '#eee',
                  borderRadius: '10px',
                }}
              >
                <InputLabel>сортировать:</InputLabel>
                <Select
                  value={sortParam}
                  onChange={(e) => {
                    setSortParam(e.target.value)
                  }}
                >
                  {sortParams.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div
                onClick={() =>
                  setSortParam((prev) => ({ ...prev, desc: !prev.desc }))
                }
                style={{ backgroundColor: '#eee', borderRadius: '10px' }}
              ></div>
            </Box>
            {!isLoadingBookings && !isLoadingRooms && !isLoadingBookmarks && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredRooms.map((room) => (
                  <RoomItem room={room} key={room.id} />
                ))}
              </Box>
            )}
          </Container>
        )}
      </>
    )
}

export default RoomList
