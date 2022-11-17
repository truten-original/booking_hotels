import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getFavourites } from '../../../store/favouritesSlice'
import { getAuthId } from '../../../store/usersSlice'

const FavouritesList = () => {
  const userId = useSelector(getAuthId())
  const favourites = useSelector(getFavourites(userId))
  return (
    <>
      <Typography variant="h5">текущие бронирования:</Typography>
    </>
  )
}

export default FavouritesList
