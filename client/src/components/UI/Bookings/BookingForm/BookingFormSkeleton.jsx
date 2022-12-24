import { Skeleton } from '@mui/material'

const BookingFormSkeleton = () => {
  return (
    <Skeleton
      animation="pulse"
      variant="rounded"
      width={365}
      height={735}
      sx={{ borderRadius: '10px' }}
    />
  )
}

export default BookingFormSkeleton
