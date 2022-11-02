import { useState } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
const FavouriteIcon = () => {
  const [favourite, setFavourite] = useState(false)
  const changeFavourite = () => {
    setFavourite((prev) => !prev)
  }
  return (
    <div onClick={changeFavourite}>
      {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}{" "}
    </div>
  )
}

export default FavouriteIcon
