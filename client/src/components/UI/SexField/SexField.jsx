import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'

const SexField = ({ register, defaultValue }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        mb: '10px',
        height: '56px',
      }}
    >
      <RadioGroup
        row
        defaultValue={defaultValue || 'female'}
        name="radio-buttons-group"
        {...register('sex')}
      >
        <FormControlLabel value="female" control={<Radio />} label="Женщина" />
        <FormControlLabel value="male" control={<Radio />} label="Мужчина" />
      </RadioGroup>
    </Box>
  )
}

export default SexField
