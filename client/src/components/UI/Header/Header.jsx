import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Label from './Label/Label'
import Navlinks from './Navlinks/Navlinks'
import ProfileComponent from './ProfileComponent/ProfileComponent'
function Header() {
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: 'rgba(204, 102, 153, 0.3)',
        margin: '0 auto',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar className="header_container">
          <Label />
          <Navlinks />
          <ProfileComponent />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
