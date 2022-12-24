import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import {
  getFavourites,
  getFavouritesLoadingStatus,
  getLocalFavs,
} from '../../../../store/favouritesSlice'
import { getCurrentRooms } from '../../../../store/roomsSlice'
import { getAuthId } from '../../../../store/usersSlice'
import FavouriteListItem from '../FavouriteListItem'
import ContentLayout from '../../../common/ContentLayout/ContentLayout'
import ItemsContainer from '../../../common/ItemsContainer'
import { Box } from '@mui/system'
import Loader from '../../../common/Loader/Loader'

const FavouritesList = () => {
  const userId = useSelector(getAuthId)
  const favouritesLoadingStatus = useSelector(getFavouritesLoadingStatus)
  const favourites = useSelector(userId ? getFavourites : getLocalFavs)
  const favRooms = useSelector(getCurrentRooms(favourites))
  return (
    <ContentLayout>
      {!favouritesLoadingStatus ? (
        <>
          <Typography sx={{ color: '#eee' }} variant="h6">
            {favourites.length
              ? 'вам понравилось'
              : 'ничего не добавлено в избранное'}
          </Typography>
          <ItemsContainer>
            {favRooms.map((room) => (
              <FavouriteListItem key={room._id} room={room} />
            ))}
          </ItemsContainer>
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

export default FavouritesList
