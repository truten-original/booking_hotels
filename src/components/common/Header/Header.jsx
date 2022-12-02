import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { navigateLinks, profileLinks } from '../../../router/links'
import {
  getAdminMeaning,
  getAuthLoadingStatus,
  getCurrentUser,
  getLoggedStatus,
  loadUsers,
} from '../../../store/usersSlice'
import classes from './Header.module.scss'
function Header() {
  const isAdmin = useSelector(getAdminMeaning)
  const isLoggedIn = useSelector(getLoggedStatus())
  const isLoading = useSelector(getAuthLoadingStatus)
  const currentUser = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUsers())
  }, [])
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: 'transparent',
        margin: '0 auto',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 300,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Your Palace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navigateLinks.map((page) => (
                <NavLink to={page.path} key={page.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    {
                      <Typography textAlign="center" sx={{ color: 'black' }}>
                        {page.name}
                      </Typography>
                    }
                  </MenuItem>
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink to={'admin'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    {
                      <Typography textAlign="center" sx={{ color: 'black' }}>
                        панель администратора
                      </Typography>
                    }
                  </MenuItem>
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink to="favourite">
                  <MenuItem>
                    <Typography textAlign="center" sx={{ color: 'black' }}>
                      избранное
                    </Typography>
                  </MenuItem>
                </NavLink>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              wordSpacing: 'none',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            YP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {navigateLinks.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={classes.main_navigation_button}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mr: 2,
                    display: 'flex',
                    flexGrow: 3,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {page.name}
                </Typography>
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to={'admin'} className={classes.main_navigation_button}>
                <Typography
                  variant="h5"
                  sx={{
                    mr: 2,
                    display: 'flex',
                    flexGrow: 3,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  панель администратора
                </Typography>
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink
                to="favourite"
                className={classes.main_navigation_button}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mr: 2,
                    display: 'flex',
                    flexGrow: 3,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  избранное
                </Typography>
              </NavLink>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {isLoggedIn && !isLoading && currentUser && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Typography
                      sx={{
                        mr: 2,
                        display: 'flex',
                        flexGrow: 3,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      {currentUser.name} {currentUser.surname}
                    </Typography>
                    <Avatar alt={currentUser.name} src={currentUser.image} />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {profileLinks.map((setting) => (
                    <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                      <Link to={setting.path}>
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {!isLoggedIn && (
              <NavLink to="login">
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    flexGrow: 3,
                    fontFamily: 'monospace',
                    fontSize: { xs: '16px', md: '24px' },
                    fontWeight: 700,
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  авторизация
                </Typography>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
