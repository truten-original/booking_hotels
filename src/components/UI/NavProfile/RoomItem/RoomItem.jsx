import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FavouriteIcon from '../../../common/FavouriteIcon'
import { facilities } from '../../../../assets/mockData/mockData'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRoomsLoadingStatus } from '../../../../store/roomsSlice'
import RoomItemSkeleton from './RoomItemSkeleton'
const RoomItem = ({ room }) => {
  const navigate = useNavigate()
  const isLoading = useSelector(getRoomsLoadingStatus())
  const facils = room.facilities.map((f) => {
    const currentF = facilities.find((item) => item.id === f)
    return currentF.name
  })
  const AboutPageHandleClick = () => {
    navigate(`/rooms/${room.id}`)
  }
  return (
    <>
      {!isLoading ? (
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
            component="img"
            height="200"
            image={room.images[0]}
            alt="green iguana"
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
              <Button color="secondary" size="mrdium">
                <FavouriteIcon />
              </Button>
            </CardActions>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h5" component="div">
                {room.name}
              </Typography>
              <ul>
                {facils.map((f) => (
                  <li key={f}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      {f}
                    </Typography>
                  </li>
                ))}
              </ul>
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
