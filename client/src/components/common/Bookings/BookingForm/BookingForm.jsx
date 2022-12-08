import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  createBooking,
  currentRoomBookingsIntervals,
} from '../../../../store/bookingsSlice'
import { getStringDate } from '../../../../utils/getStringDate'
import { getAuthId } from '../../../../store/usersSlice'
import checkBookingInterval from '../../../../utils/checkBookingInterval'
import { createId } from '../../../../utils/createId'
import { getRoomPrice } from '../../../../utils/getRoomPrice'
import CheckBoxField from '../../../UI/CheckBoxField/CheckBoxField'
import DatePicker from '../../../UI/DatePicker/DatePicker'
import ErrorFormText from '../../../UI/ErrorFormText/ErrorFormText'
import GuestsCounter from '../../../UI/GuestsCounter/GuestsCounter'
import RoomPrice from '../../../UI/RoomPrice/RoomPrice'
import RoomType from '../../../UI/RoomType/RoomType'
import SubmitField from '../../../UI/SubmitField/SubmitField'
import FavouriteIcon from '../../Favourites/FavouriteIcon'
const BookingForm = ({ room }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentRoomBookingIntervalsArr = useSelector(
    currentRoomBookingsIntervals(room.id)
  )
  const userId = useSelector(getAuthId)
  const [isFullPay, setIsFullPay] = useState(true)
  const [bookingData, setBookingData] = useState({
    arrivalDate: Date.now(),
    departureDate: Date.now() + 86400000,
    roomId: room._id,
    guestsCount: 1,
    price: isFullPay
      ? getRoomPrice(room.price, 5).price
      : getRoomPrice(room.price).price,
    discount: isFullPay
      ? getRoomPrice(room.price, 5).discount
      : getRoomPrice(room.price).discount,
  })

  const [isValidDate, setIsValidDate] = useState(null)
  const { daysQuantity } = checkBookingInterval(
    [bookingData.arrivalDate, bookingData.departureDate],
    currentRoomBookingIntervalsArr
  )
  useEffect(() => {
    setIsValidDate(
      checkBookingInterval(
        [bookingData.arrivalDate, bookingData.departureDate],
        currentRoomBookingIntervalsArr
      ).isValid
    )
    if (bookingData.arrivalDate >= bookingData.departureDate) {
      setBookingData((prev) => ({
        ...prev,
        departureDate: bookingData.arrivalDate + 86400000,
      }))
    }
  }, [bookingData.arrivalDate, bookingData.departureDate])
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
  const handleSubmit = (data) => {
    if (userId) {
      dispatch(createBooking(data))
      navigate('/rooms', { replace: true })
      toast.success(
        `Номер успешно забронирован c ${getStringDate(
          bookingData.arrivalDate
        )} по  ${getStringDate(bookingData.departureDate)}`
      )
    } else {
      toast.warn(
        'Бронирование доступно только для авторизованных пользователей'
      )
    }
  }
  const { price, discount } = isFullPay
    ? getRoomPrice(room.price * daysQuantity, 5)
    : getRoomPrice(room.price * daysQuantity)
  return (
    <Box
      className="bookingform_container"
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(bookingData)
      }}
    >
      <FavouriteIcon roomId={room.id} />
      <Divider light />
      <Typography variant="h6">{room.name}</Typography>
      <RoomType type={room.type} />
      <RoomPrice price={room.price} />
      <Divider light />
      <DatePicker
        disablePast
        arrivalDate={bookingData.arrivalDate}
        departureDate={bookingData.departureDate}
        handleArrivalDateChange={handleArrivalDateChange}
        handleDepatureDateChange={handleDepatureDateChange}
      />
      {!isValidDate && (
        <ErrorFormText message="выбранный интервал недоступен для бронирования" />
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
