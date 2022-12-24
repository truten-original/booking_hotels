import { Box, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import ContentLayout from '../../components/common/ContentLayout'
import RoomItem from '../../components/common/RoomItem/RoomItem'
import RoomItemSkeleton from '../../components/common/RoomItem/RoomItemSkeleton'
import SearchPanel from '../../components/UI/SearchPanel/SearchPanel'
import { getCurrentUserBookings, loadBookings } from '../../store/bookingsSlice'
import { loadBookmarks } from '../../store/bookmarksSlice'
import { loadFavourites } from '../../store/favouritesSlice'
import { getRooms, getRoomsLoadingStatus } from '../../store/roomsSlice'
import { getTypesLoadingStatus } from '../../store/typesSlice'
import { getAuthId, getAuthLoadingStatus } from '../../store/usersSlice'
import { checkAvailableRooms } from '../../utils/checkAvailableRooms'
import { paginate } from '../../utils/paginate'
const RoomList = () => {
  const roomsLoadingStatus = useSelector(getRoomsLoadingStatus)
  const typesLoadingStatus = useSelector(getTypesLoadingStatus)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [quantityItems, setQuantityItems] = useState({
    currentPage: 1,
    quantity: 6,
  })
  const authLoadingStatus = useSelector(getAuthLoadingStatus)
  const userId = useSelector(getAuthId)
  const books = useSelector(getCurrentUserBookings(userId))
  const { roomId } = useParams()
  const rooms = useSelector(getRooms)
  const arr = checkAvailableRooms([...rooms], books)
  const skelArr = new Array(quantityItems.quantity).fill(0)
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
  return (
    <>
      <ContentLayout>
        {roomId ? (
          <Outlet />
        ) : (
          <>
            <SearchPanel
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              quantityArr={quantityArr}
              setQuantityItems={setQuantityItems}
              quantityItems={quantityItems}
            />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'space-around',
              }}
            >
              {!roomsLoadingStatus && !authLoadingStatus && !typesLoadingStatus
                ? currentRooms.map((room) => (
                    <RoomItem room={room} key={room._id} />
                  ))
                : skelArr.map((s, i) => <RoomItemSkeleton key={i} />)}
            </Box>

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
