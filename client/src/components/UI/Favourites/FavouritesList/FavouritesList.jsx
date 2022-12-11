import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getFavourites, getLocalFavs } from '../../../../store/favouritesSlice'
import { getCurrentRooms } from '../../../../store/roomsSlice'
import { getAuthId } from '../../../../store/usersSlice'
import FavouriteListItem from '../FavouriteListItem'
import ContentLayout from '../../../common/ContentLayout/ContentLayout'
import ItemsContainer from '../../../common/ItemsContainer'

const FavouritesList = () => {
  const userId = useSelector(getAuthId)

  const favourites = useSelector(userId ? getFavourites : getLocalFavs)
  const favRooms = useSelector(getCurrentRooms(favourites))
  return (
    <ContentLayout>
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
    </ContentLayout>
  )
}

export default FavouritesList
