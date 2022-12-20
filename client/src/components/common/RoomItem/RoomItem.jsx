import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FavouriteIcon from '../../UI/Favourites/FavouriteIcon'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRoomsLoadingStatus } from '../../../store/roomsSlice'
import RoomItemSkeleton from './RoomItemSkeleton'
import RoomFacilities from '../RoomFacilities/RoomFacilities'
import BookmarkComponent from '../../UI/Bookmarks/BookmarkComponent'
import { getFavouritesLoadingStatus } from '../../../store/favouritesSlice'
const RoomItem = ({ room }) => {
  const navigate = useNavigate()
  const isLoading = useSelector(getRoomsLoadingStatus)
  const isLoadingFavourites = useSelector(getFavouritesLoadingStatus)
  const AboutPageHandleClick = () => {
    navigate(`/rooms/${room._id}`)
  }
  return (
    <>
      {!isLoading && !isLoadingFavourites ? (
        <Card
          sx={{
            width: 350,
            minHeight: 400,
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#eee',
          }}
        >
          <CardMedia
            onClick={AboutPageHandleClick}
            component="img"
            height="200"
            image={room.images[0]}
            alt="green iguana"
            sx={{ cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CardActions
              sx={{
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                onClick={AboutPageHandleClick}
                color="secondary"
                size="small"
              >
                Подробнее
              </Button>
              <FavouriteIcon roomId={room._id} />
              <BookmarkComponent roomId={room._id} />
            </CardActions>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h5" component="div">
                {room.name}
              </Typography>
              <RoomFacilities facilitiesArr={room.facilities} />
            </CardContent>
          </div>
        </Card>
      ) : (
        <RoomItemSkeleton />
      )}
    </>
  )
}

export default RoomItem
