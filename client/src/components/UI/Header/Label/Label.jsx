import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Label = () => {
  return (
    <Link to="/">
      <Typography
        variant="h6"
        noWrap
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 300,
          color: 'white',
          textDecoration: 'none',
        }}
      >
        Your Palace
      </Typography>
    </Link>
  )
}

export default Label
