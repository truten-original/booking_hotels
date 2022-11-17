import { Box, Pagination, TextField } from '@mui/material'
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
import {
  getBookmarksLoadingStatus,
  loadBookmarks,
} from '../../store/bookmarksSlice'
import { loadFavourites } from '../../store/favouritesSlice'
import {
  changeFilter,
  getCurrentFilter,
  getFilters,
} from '../../store/roomsFilterSlice'
import { getAllRooms, getRooms } from '../../store/roomsSlice'
import { getAuthId } from '../../store/usersSlice'
import { checkAvailableRooms } from '../../utils/checkAvailableRooms'
import { paginate } from '../../utils/paginate'
const RoomList = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [quantityItems, setQuantityItems] = useState({
    currentPage: 1,
    quantity: 3,
  })
  const userId = useSelector(getAuthId())
  const isLoadingBookings = useSelector(getBookingLoadingStatus())
  const isLoadingBookmarks = useSelector(getBookmarksLoadingStatus())
  const sortParams = useSelector(getFilters)
  const sortParam = useSelector(getCurrentFilter)
  const books = useSelector(getCurrentUserBookings(userId))
  const { roomId } = useParams()
  const rooms = useSelector(getRooms)
  const { arr, quantityPage } = paginate(
    checkAvailableRooms([...rooms], books),
    quantityItems.quantity,
    quantityItems.currentPage
  )
  useEffect(() => {
    dispatch(loadBookings())
    dispatch(loadBookmarks())
    dispatch(loadFavourites())
  }, [dispatch])
  useEffect(() => {
    if (quantityPage < quantityItems.currentPage) {
      setQuantityItems((prev) => ({ ...prev, currentPage: quantityPage }))
    }
  }, [quantityPage])
  const availableRooms = arr
  const quantityArr = [3, 6, 12]
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
                    dispatch(changeFilter(e.target.value))
                  }}
                >
                  {sortParams.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <InputLabel>отобразить:</InputLabel>
                <Select
                  value={quantityItems.quantity}
                  onChange={(e) => {
                    setQuantityItems((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }}
                >
                  {quantityArr.map((item) => (
                    <MenuItem key={item} value={item}>
                      {'по ' + item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {!isLoadingBookings && !isLoadingBookmarks && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredRooms.map((room) => (
                  <RoomItem room={room} key={room.id} />
                ))}
              </Box>
            )}
            {quantityPage !== 1 && (
              <Pagination
                onChange={(_, page) =>
                  setQuantityItems((prev) => ({ ...prev, currentPage: page }))
                }
                sx={{ mt: '1rem', alignContent: 'center' }}
                count={quantityPage}
                color="secondary"
              />
            )}
          </Container>
        )}
      </>
    )
}

export default RoomList
