import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeClass,
  changeFilter,
  getClasses,
  getCurrentClass,
  getCurrentFilter,
  getFilters,
} from '../../../store/roomsFilterSlice'

const SearchPanel = ({
  searchQuery,
  setSearchQuery,
  quantityArr,
  setQuantityItems,
  quantityItems,
}) => {
  const dispatch = useDispatch()
  const sortClasses = useSelector(getClasses)
  const sortClass = useSelector(getCurrentClass)
  const sortParams = useSelector(getFilters)
  const sortParam = useSelector(getCurrentFilter)
  return (
    <Box
      sx={{
        display: 'flex',
        mb: '20px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        p: '4px 5px',
        justifyContent: 'space-around',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        rowGap: '0.5vh',
      }}
    >
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
          fontSize: '20px',
          width: {
            xs: '100%',
            md: '40%',
          },
          backgroundColor: '#eee',
          borderRadius: '10px',
        }}
      />
      <FormControl
        color="secondary"
        variant="standard"
        sx={{
          borderRadius: '10px',
          minWidth: '200px',
        }}
      >
        <InputLabel>сортировать:</InputLabel>
        <Select
          value={sortParam}
          onChange={(e) => {
            dispatch(changeFilter(e.target.value))
          }}
        >
          {sortParams.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        color="secondary"
        variant="standard"
        sx={{
          minWidth: 210,
          backgroundColor: '#eee',
        }}
      >
        <InputLabel>отобразить:</InputLabel>
        <Select
          value={quantityItems.quantity}
          onChange={(e) => {
            setQuantityItems((prev) => ({
              ...prev,
              quantity: e.target.value,
            }))
          }}
        >
          {quantityArr.map((item) => (
            <MenuItem key={item} value={item}>
              {'по ' + item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        color="secondary"
        variant="standard"
        sx={{
          minWidth: 210,
          backgroundColor: '#eee',
        }}
      >
        <InputLabel>выбрать по классу:</InputLabel>
        <Select
          value={sortClass}
          onChange={(e) => {
            dispatch(changeClass(e.target.value))
          }}
        >
          {sortClasses.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SearchPanel
