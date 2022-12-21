import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ruLocale } from '../../../localeConfig/localeConfig'
ruLocale()
const DatePicker = ({
  handleArrivalDateChange,
  handleDepatureDateChange,
  arrivalDate,
  departureDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        className="datepicker"
        disablePast
        label="Дата прибытия"
        inputFormat="DD/MM/YYYY"
        value={arrivalDate}
        onChange={(e) => handleArrivalDateChange(e)}
        renderInput={(params) => <TextField color="secondary" {...params} />}
      />
      <DesktopDatePicker
        minDate={arrivalDate + 86400000}
        label="Дата выезда"
        inputFormat="DD/MM/YYYY"
        value={departureDate}
        onChange={(e) => handleDepatureDateChange(e)}
        renderInput={(params) => <TextField {...params} color="secondary" />}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
