import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from 'react-redux'
import {
  createFavourite,
  createLocalFavourite,
  getCurrentRoomFavourite,
  getCurrentRoomLocalFavourite,
  removeFavourite,
  removeLocalFavourite,
} from '../../../../store/favouritesSlice'
import { getAuthId } from '../../../../store/usersSlice'
import { createId } from '../../../../utils/createId'
import { Button } from '@mui/material'
const FavouriteIcon = ({ roomId, ...props }) => {
  const userId = useSelector(getAuthId)
  const dispatch = useDispatch()
  const currentFavourite = useSelector(getCurrentRoomFavourite(roomId))
  const isFavourite = !!currentFavourite
  const currentLocalFav = useSelector(getCurrentRoomLocalFavourite(roomId))
  const localFav = !!currentLocalFav
  const [favourite, setFavourite] = useState(userId ? isFavourite : localFav)

  const changeFavourite = () => {
    if (userId) {
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
    } else {
      if (favourite) {
        dispatch(removeLocalFavourite(roomId))
      } else {
        dispatch(createLocalFavourite({ roomId }))
      }
      setFavourite((prev) => !prev)
    }
  }

  return (
    <Button {...props} color="secondary" onClick={changeFavourite}>
      {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}{' '}
    </Button>
  )
}

export default FavouriteIcon
