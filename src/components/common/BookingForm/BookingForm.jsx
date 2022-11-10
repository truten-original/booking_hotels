import { useState } from 'react'
import DatePicker from '../../UI/DatePicker/DatePicker'
import GuestsCounter from '../../UI/GuestsCounter/GuestsCounter'
import { Box } from '@mui/system'
import { Button, Divider, Typography } from '@mui/material'
import RoomType from '../../UI/RoomType/RoomType'
import RoomPrice from '../../UI/RoomPrice/RoomPrice'
import CheckBoxField from '../../UI/CheckBoxField/CheckBoxField'
import { getRoomPrice } from '../../../utils/getRoomPrice'
import SubmitField from '../../UI/SubmitField/SubmitField'
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon'
const BookingForm = ({ room }) => {
  const [isFullPay, setIsFullPay] = useState(true)
  const [bookingData, setBookingData] = useState({
    arrivalDate: Date.now(),
    departureDate: Date.now(),
    userId: '',
    roomId: room.id,
    guestsCount: 1,
  })
  const fullPayHandleChange = () => {
    setIsFullPay((prev) => !prev)
  }
  const handleChangeCount = (e) => {
    setBookingData((prev) => ({ ...prev, guestsCount: e.target.value }))
  }
  const handleArrivalDateChange = (e) => {
    setBookingData((prev) => ({ ...prev, arrivalDate: e.$d.valueOf() }))
  }
  const handleDepatureDateChange = (e) => {
    setBookingData((prev) => ({ ...prev, departureDate: e.$d.valueOf() }))
  }
  const { price, discount } = isFullPay
    ? getRoomPrice(room.price, 5)
    : getRoomPrice(room.price)
  return (
    <Box className="bookingform_container">
      <Button color="secondary" sx={{ fontSize: '2rem' }}>
        <FavouriteIcon />
      </Button>
      <Divider light />
      <Typography variant="h6">{room.name}</Typography>
      <RoomType type={room.type} />
      <RoomPrice price={room.price} />

      <Divider light />
      <DatePicker
        arrivalDate={bookingData.arrivalDate}
        departureDate={bookingData.departureDate}
        handleArrivalDateChange={handleArrivalDateChange}
        handleDepatureDateChange={handleDepatureDateChange}
      />
      <GuestsCounter
        guestsCount={bookingData.guestsCount}
        handleChangeCount={handleChangeCount}
      />
      <CheckBoxField
        description="- 5% при 100% предоплате"
        fullPayHandleChange={fullPayHandleChange}
        isFullPay={isFullPay}
      />
      <p>
        Скидка -<Typography component="span">{discount}</Typography>
      </p>
      <p>
        К оплате -<Typography component="span"> {price}</Typography> рублей
      </p>

      <SubmitField value="Забронировать" type="submit" />
    </Box>
  )
}

export default BookingForm
