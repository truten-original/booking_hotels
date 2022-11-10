import { TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const DatePicker = ({
  handleArrivalDateChange,
  handleDepatureDateChange,
  arrivalDate,
  departureDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Дата прибытия"
        inputFormat="DD/MM/YYYY"
        value={arrivalDate}
        onChange={(e) => handleArrivalDateChange(e)}
        renderInput={(params) => <TextField {...params} />}
      />
      <DesktopDatePicker
        label="Дата выезда"
        inputFormat="DD/MM/YYYY"
        value={departureDate}
        onChange={(e) => handleDepatureDateChange(e)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
