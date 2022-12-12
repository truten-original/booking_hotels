import { Box } from '@mui/system'
const ItemsContainer = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '2vh' }}>
      {children}
    </Box>
  )
}

export default ItemsContainer
