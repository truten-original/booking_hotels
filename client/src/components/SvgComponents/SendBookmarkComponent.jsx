import { ReactComponent as BookmarSvg } from '../../assets/images/svg/social/bookmark.svg'
const SendBookmarkComponent = ({ color, ...props }) => {
  return <BookmarSvg {...props} style={{ fill: color ? color : '#fff' }} />
}

export default SendBookmarkComponent
