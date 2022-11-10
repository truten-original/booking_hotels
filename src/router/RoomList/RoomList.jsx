import { Box, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Container } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import RoomItem from '../../components/UI/RoomItem'
import { getRooms } from '../../store/roomsSlice'
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
        <Container
          sx={{ mt: '80px', height: !!rooms.length ? '100%' : '100vh' }}
        >
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
            ></div>
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
