import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import {
  getCurrentFacilities,
  getFacilitiesStatus,
} from '../../../store/facilitiesSlice'
const RoomFacilities = ({ facilitiesArr, nameSize }) => {
  const isLoading = useSelector(getFacilitiesStatus())
  const facils = useSelector(getCurrentFacilities(facilitiesArr))
  return (
    <ul style={{ listStyleType: 'none' }}>
      {!isLoading &&
        !!facils &&
        facils.map((f) => (
          <li key={f._id}>
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{ fontSize: nameSize }}
            >
              {f.name}
            </Typography>
          </li>
        ))}
    </ul>
  )
}

export default RoomFacilities
