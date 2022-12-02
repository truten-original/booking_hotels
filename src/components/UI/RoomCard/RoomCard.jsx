import { Typography } from '@mui/material'
import { useState } from 'react'
import MyModal from '../MyModal/MyModal'
import RoomFacilities from '../RoomFacilities/RoomFacilities'
import RoomPrice from '../RoomPrice/RoomPrice'

const RoomCard = ({ room, facilities }) => {
  return (
    <>
      <img
        alt={room.name}
        src={room.images[0]}
        style={{
          width: '300px',
          height: '180px',
          borderRadius: '10px',
          border: '1px solid #9c2780',
          padding: '10px',
          borderRadius: '10px',
        }}
      />
      <Typography sx={{ color: 'black' }}>{room.name}</Typography>
      {facilities && <RoomFacilities facilitiesArr={room.facilities} />}
      <RoomPrice price={room.price} />
    </>
  )
}

export default RoomCard
