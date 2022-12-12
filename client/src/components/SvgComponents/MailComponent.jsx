import { ReactComponent as Mail } from '../../assets/images/svg/social/mail.svg'
const MailComponent = ({ color, ...props }) => {
  return <Mail {...props} style={{ fill: color ? color : '#fff' }} />
}

export default MailComponent
