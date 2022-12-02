import { Box } from '@mui/system'

const RoomCardWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        minHeight: '250px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        alignItems: 'center',
        p: '10px',
      }}
    >
      {children}
    </Box>
  )
}
export default RoomCardWrapper
