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
import { getAuthId } from '../../../../store/usersSlice'
import checkBookingInterval from '../../../../utils/checkBookingInterval'
import { getRoomPrice } from '../../../../utils/getRoomPrice'
import { getStringDate } from '../../../../utils/getStringDate'
import ErrorWrapper from '../../../common/ErrorWrapper'
import CheckBoxField from '../../../common/CheckBoxField/CheckBoxField'
import DatePicker from '../../../common/DatePicker/DatePicker'
import GuestsCounter from '../../../common/GuestsCounter/GuestsCounter'
import RoomPrice from '../../../common/RoomPrice/RoomPrice'
import RoomType from '../../../common/RoomType/RoomType'
import SubmitField from '../../../common/SubmitField'
import FavouriteIcon from '../../Favourites/FavouriteIcon/FavouriteIcon'
const BookingForm = ({ room }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentRoomBookingIntervalsArr = useSelector(
    currentRoomBookingsIntervals(room._id)
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
    const arDate = new Date(bookingData.arrivalDate).getDate()
    const depDate = new Date(bookingData.departureDate).getDate()
    if (arDate === depDate) {
      setBookingData((prev) => ({
        ...prev,
        departureDate: prev.arrivalDate + 86400000,
      }))
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bookingData.arrivalDate,
    bookingData.departureDate,
    currentRoomBookingIntervalsArr.length,
  ])
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
      <FavouriteIcon roomId={room._id} />
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
        <ErrorWrapper>
          выбранный интервал недоступен для бронирования
        </ErrorWrapper>
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
        Скидка -<Typography component="span">{discount || 0}</Typography>
      </p>
      <p>
        К оплате -<Typography component="span"> {price || 0}</Typography> рублей
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
