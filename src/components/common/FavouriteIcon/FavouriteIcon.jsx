import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from 'react-redux'
import {
  createFavourite,
  getCurrentRoomFavourite,
  removeFavourite,
} from '../../../store/favouritesSlice'
import { getAuthId } from '../../../store/usersSlice'
import { createId } from '../../../utils/createId'
const FavouriteIcon = ({ roomId }) => {
  const userId = useSelector(getAuthId())
  const dispatch = useDispatch()
  const currentFavourite = useSelector(getCurrentRoomFavourite(roomId))
  const isFavourite = !!currentFavourite
  const [favourite, setFavourite] = useState(isFavourite)
  const changeFavourite = () => {
    if (favourite) {
      dispatch(removeFavourite(currentFavourite.id))
    } else {
      dispatch(
        createFavourite({
          roomId,
          userId,
          id: createId(),
        })
      )
    }
    setFavourite((prev) => !prev)
  }
  return (
    <div onClick={changeFavourite}>
      {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}{' '}
    </div>
  )
}

export default FavouriteIcon
