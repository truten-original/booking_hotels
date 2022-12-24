import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { getAdminMeaning, getLoggedStatus } from '../../../../store/usersSlice'
import { navigateLinks } from '../../../../router/links'
const Navlinks = () => {
  const isAdmin = useSelector(getAdminMeaning)
  const isLoggedIn = useSelector(getLoggedStatus)
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'flex', md: 'none', alignItems: 'center' },
        }}
      >
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
          className="menu_container"
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
            <NavLink to={page.path} key={page.path} className="menu_link">
              <MenuItem onClick={handleCloseNavMenu}>{page.name}</MenuItem>
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to={'admin'} className="menu_link">
              <MenuItem onClick={handleCloseNavMenu}>
                панель администратора
              </MenuItem>
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink to="favourite" className="menu_link">
              <MenuItem>
                <Typography textAlign="center" sx={{ color: 'black' }}>
                  избранное
                </Typography>
              </MenuItem>
            </NavLink>
          )}
        </Menu>
        <Link to="/">
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              ml: 1,
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              wordSpacing: 'none',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            YP
          </Typography>
        </Link>
      </Box>
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
            className={({ isActive }) =>
              isActive ? 'nav_btn_active' : 'header_navigation_button'
            }
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
          <NavLink
            to={'admin'}
            className={({ isActive }) =>
              isActive ? 'nav_btn_active' : 'header_navigation_button'
            }
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
              панель администратора
            </Typography>
          </NavLink>
        )}

        {!isLoggedIn && (
          <NavLink
            to="favourite"
            className={({ isActive }) =>
              isActive ? 'nav_btn_active' : 'header_navigation_button'
            }
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
    </>
  )
}

export default Navlinks
