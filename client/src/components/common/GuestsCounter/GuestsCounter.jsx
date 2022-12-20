import { Slider, Typography, Box } from '@mui/material'

const GuestsCounter = ({ guestsCount, handleChangeCount }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Slider
          color="secondary"
          className="slider_root"
          size="md"
          value={guestsCount}
          min={1}
          step={1}
          max={10}
          onChange={(e) => handleChangeCount(e)}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
        <Typography gutterBottom> Гости:{guestsCount}</Typography>
      </Box>
    </>
  )
}

export default GuestsCounter
