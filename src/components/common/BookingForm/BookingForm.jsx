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
import { getAuthId } from '../../../store/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import checkBookingInterval from '../../../utils/checkBookingInterval'
import {
  createBooking,
  currentRoomBookingsIntervals,
} from '../../../store/bookingsSlice'
import { createId } from '../../../utils/createId'
import { useNavigate } from 'react-router-dom'
const BookingForm = ({ room }) => {
  const arr = [[1668350030000, 1668782030000]]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentRoomBookingIntervalsArr = useSelector(
    currentRoomBookingsIntervals(room.id)
  )
  const userId = useSelector(getAuthId())
  const [isFullPay, setIsFullPay] = useState(true)
  const [bookingData, setBookingData] = useState({
    arrivalDate: Date.now(),
    departureDate: Date.now(),
    userId,
    roomId: room.id,
    guestsCount: 1,
    id: createId(),
    price: {
      price: isFullPay
        ? getRoomPrice(room.price, 5).price
        : getRoomPrice(room.price).price,
      discount: isFullPay
        ? getRoomPrice(room.price, 5).discount
        : getRoomPrice(room.price).discount,
    },
  })
  const [isValidDate, setIsValidDate] = useState(
    checkBookingInterval(
      [bookingData.arrivalDate, bookingData.departureDate],
      arr
    )
  )
  console.log(
    isValidDate,
    checkBookingInterval(
      [bookingData.arrivalDate, bookingData.departureDate],
      arr
    )
  )
  const fullPayHandleChange = () => {
    setIsFullPay((prev) => !prev)
  }
  const handleChangeCount = (e) => {
    setBookingData((prev) => ({ ...prev, guestsCount: e.target.value }))
  }
  const handleArrivalDateChange = (e) => {
    setBookingData((prev) => ({ ...prev, arrivalDate: e.$d.valueOf() }))
    const isValid = checkBookingInterval(
      [bookingData.arrivalDate, bookingData.departureDate],
      currentRoomBookingIntervalsArr
    )
    setIsValidDate(isValid)
  }
  const handleDepatureDateChange = (e) => {
    setBookingData((prev) => ({ ...prev, departureDate: e.$d.valueOf() }))
    const isValid = checkBookingInterval(
      [bookingData.arrivalDate, bookingData.departureDate],
      currentRoomBookingIntervalsArr
    )
    setIsValidDate(isValid)
  }
  const handleSubmit = (data) => {
    dispatch(createBooking(data))
    navigate('rooms', { replace: true })
  }
  const { price, discount } = isFullPay
    ? getRoomPrice(room.price, 5)
    : getRoomPrice(room.price)

  return (
    <Box
      className="bookingform_container"
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(bookingData)
      }}
    >
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
      {!isValidDate && isValidDate && (
        <Typography sx={{ color: 'red' }}>
          номер недоступен для бронирования на этот промежуток времени
        </Typography>
      )}
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
      <SubmitField
        value="Забронировать"
        type="submit"
        disabled={!isValidDate}
      />
    </Box>
  )
}

export default BookingForm
