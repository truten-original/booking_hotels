import { Box, Pagination, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import ContentLayout from '../../components/common/ContentLayout'
import RoomItem from '../../components/common/RoomItem/RoomItem'
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
import { getRooms } from '../../store/roomsSlice'
import { getAuthId } from '../../store/usersSlice'
import { checkAvailableRooms } from '../../utils/checkAvailableRooms'
import { paginate } from '../../utils/paginate'
const RoomList = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [quantityItems, setQuantityItems] = useState({
    currentPage: 1,
    quantity: 6,
  })
  const userId = useSelector(getAuthId)
  const isLoadingBookings = useSelector(getBookingLoadingStatus)
  const isLoadingBookmarks = useSelector(getBookmarksLoadingStatus())
  const sortParams = useSelector(getFilters)
  const sortParam = useSelector(getCurrentFilter)
  const books = useSelector(getCurrentUserBookings(userId))
  const { roomId } = useParams()
  const rooms = useSelector(getRooms)
  const arr = checkAvailableRooms([...rooms], books)
  useEffect(() => {
    dispatch(loadBookings())
    dispatch(loadBookmarks())
    dispatch(loadFavourites(userId))
  }, [dispatch, userId])
  useEffect(() => {
    setQuantityItems((prev) => ({ ...prev, currentPage: 1 }))
  }, [quantityItems.quantity])
  const quantityArr = [3, 6, 12]
  const filteredRooms = searchQuery
    ? arr.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...arr]

  const currentRooms = paginate(
    filteredRooms,
    quantityItems.quantity,
    quantityItems.currentPage
  )
  if (rooms)
    return (
      <>
        <ContentLayout>
          {roomId ? (
            <Outlet />
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  mb: '20px',
                  backgroundColor: '#eee',
                  borderRadius: '10px',
                  p: '4px 5px',
                  justifyContent: 'space-around',
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                  rowGap: '0.5vh',
                }}
              >
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
                    fontSize: '20px',
                    width: {
                      xs: '100%',
                      md: '40%',
                    },
                    backgroundColor: '#eee',
                    borderRadius: '10px',
                  }}
                />
                <FormControl
                  color="secondary"
                  variant="standard"
                  sx={{
                    borderRadius: '10px',
                    minWidth: '200px',
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
                    minWidth: 210,
                    backgroundColor: '#eee',
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
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'space-around',
                  }}
                >
                  {currentRooms.map((room) => (
                    <RoomItem room={room} key={room._id} />
                  ))}
                </Box>
              )}
              {!!filteredRooms.length && (
                <Pagination
                  page={quantityItems.currentPage}
                  onChange={(_, page) =>
                    setQuantityItems((prev) => ({ ...prev, currentPage: page }))
                  }
                  sx={{ mt: '1rem', alignContent: 'center' }}
                  count={Math.ceil(arr.length / quantityItems.quantity)}
                  color="secondary"
                />
              )}
            </>
          )}
        </ContentLayout>
      </>
    )
}

export default RoomList
