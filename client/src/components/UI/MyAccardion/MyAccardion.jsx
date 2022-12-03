import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getStringDate } from '../../../utils/getStringDate'

const MyAccardion = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              клиент: {item.userName} {item.userSurname}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              интервал: {getStringDate(item.arrivalDate)}-
              {getStringDate(item.departureDate)}
            </Typography>
            <Typography>сумма: {item.price.price} рублей</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
export default MyAccardion
