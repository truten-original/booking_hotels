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
        defaultValue={defaultValue || 'male'}
        name="radio-buttons-group"
      >
        <FormControlLabel
          {...register('sex')}
          value="female"
          control={<Radio />}
          label="Женщина"
        />
        <FormControlLabel
          {...register('sex')}
          value="male"
          control={<Radio />}
          label="Мужчина"
        />
      </RadioGroup>
    </Box>
  )
}

export default SexField
