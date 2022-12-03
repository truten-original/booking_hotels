import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const MyToogleButton = ({ fields, handleChange, value }) => {
  return (
    <Box
      sx={{
        height: '50px',
        backgroundColor: '#eee',
        justifyContent: 'center',
        borderRadius: '10px',
        width: 'fit-content',
        margin: '0 auto',
        mb: '2vh',
      }}
    >
      <ToggleButtonGroup
        color="secondary"
        value={value}
        exclusive
        onChange={(e) => {
          handleChange(e.target.value)
        }}
      >
        {fields.map((field) => (
          <ToggleButton
            key={field.value}
            sx={{ backgroundColor: '#eee' }}
            value={field.value}
          >
            {field.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default MyToogleButton
