import { Box, Checkbox } from '@mui/material'

const CheckBoxField = ({ description, isFullPay, fullPayHandleChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-arround',
      }}
    >
      <Checkbox
        color="secondary"
        checked={isFullPay}
        onChange={fullPayHandleChange}
      />
      <p>{description}</p>
    </Box>
  )
}

export default CheckBoxField
