import { Skeleton } from '@mui/material'

const RoomItemSkeleton = () => {
  return (
    <Skeleton
      animation="pulse"
      variant="rounded"
      width={350}
      height={520}
      sx={{ borderRadius: '10px' }}
    />
  )
}

export default RoomItemSkeleton
