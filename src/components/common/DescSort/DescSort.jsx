import CallMadeIcon from '@mui/icons-material/CallMade'
import CallReceivedIcon from '@mui/icons-material/CallReceived'

const DescSort = ({ isDecreasing }) => {
  return (
    <>
      {isDecreasing ? <CallReceivedIcon fontSize="large" /> : <CallMadeIcon />}
    </>
  )
}

export default DescSort
