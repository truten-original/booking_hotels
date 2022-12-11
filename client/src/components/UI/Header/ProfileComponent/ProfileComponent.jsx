import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  getAuthLoadingStatus,
  getCurrentUser,
  getLoggedStatus,
} from '../../../../store/usersSlice'
import { profileLinks } from '../../../../router/links'
const ProfileComponent = () => {
  const isLoading = useSelector(getAuthLoadingStatus)
  const isLoggedIn = useSelector(getLoggedStatus())
  const currentUser = useSelector(getCurrentUser)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
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
              <NavLink
                key={setting.path}
                to={setting.path}
                className="menu_link"
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  {setting.name}
                </MenuItem>
              </NavLink>
            ))}
          </Menu>
        </>
      )}
      {!isLoggedIn && (
        <NavLink
          to="login"
          className={({ isActive }) =>
            isActive ? 'nav_btn_active' : 'header_navigation_button'
          }
        >
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
  )
}

export default ProfileComponent
