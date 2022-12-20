import { Box } from '@mui/material'
import CopyRightComponent from '../../common/CopyRightComponent'
import SocialComponent from '../../common/SocialComponent/SocialComponent'

const Footer = ({ position }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: '#eee',
        height: '10vh',
        position: 'static',
        width: '100%',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        gap: '10px',
        paddingLeft: '20px',
      }}
    >
      <SocialComponent />
      <CopyRightComponent />
    </Box>
  )
}

export default Footer
