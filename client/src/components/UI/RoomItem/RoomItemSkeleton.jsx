import { Skeleton } from '@mui/material'

const RoomItemSkeleton = () => {
  return (
    <Skeleton
      animation={false}
      variant="rounded"
      width={350}
      height={400}
      sx={{ borderRadius: '10px' }}
    />
  )
}

export default RoomItemSkeleton
