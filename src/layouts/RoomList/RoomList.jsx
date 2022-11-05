import { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import { Box, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Outlet, useParams } from 'react-router-dom'
import RoomItem from '../../components/UI/NavProfile/RoomItem'
import { rooms } from '../../assets/mockData/mockData'
import DescSort from '../../components/common/DescSort/DescSort'
import roomService from '../../service/rooms.service'
import { useSelector } from 'react-redux'
import { getRooms, getRoomsLoadingStatus } from '../../store/roomsSlice'
const RoomList = () => {
  const rooms = useSelector(getRooms())

  const { roomId } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortParam, setSortParam] = useState({ value: '', desc: true })
  const filteredRooms = searchQuery
    ? rooms.filter((room) => room.name.toLowerCase().includes(searchQuery))
    : rooms
  return (
    <>
      {roomId ? (
        <Outlet />
      ) : (
        <Container sx={{ mt: '80px', height: '100vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <TextField
              color="secondary"
              label="Поиск"
              type="search"
              variant="standard"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
              }}
              sx={{
                mb: 2,
                fontSize: '20px',
                width: '33%',
                backgroundColor: '#eee',
                borderRadius: '10px',
              }}
            />
            <FormControl
              color="secondary"
              variant="standard"
              sx={{
                m: 1,
                minWidth: 210,
                backgroundColor: '#eee',
                borderRadius: '10px',
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Сортировка по:
              </InputLabel>
              <Select
                value={sortParam.value}
                onChange={(e) => {
                  setSortParam((prev) => ({ ...prev, value: e.target.value }))
                }}
              >
                <MenuItem value="raiting">популярности</MenuItem>
                <MenuItem value="facilities">По количеству удобств</MenuItem>
                <MenuItem value="price">По цене</MenuItem>
              </Select>
            </FormControl>
            <div
              onClick={() =>
                setSortParam((prev) => ({ ...prev, desc: !prev.desc }))
              }
              style={{ backgroundColor: '#eee', borderRadius: '10px' }}
            >
              <DescSort isDecreasing={sortParam.desc} />
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredRooms.map((room) => (
              <RoomItem room={room} key={room.id} />
            ))}
          </Box>
        </Container>
      )}
    </>
  )
}

export default RoomList
