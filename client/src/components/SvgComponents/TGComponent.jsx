import { ReactComponent as TG } from '../../assets/images/svg/social/male.svg'
const TGComponent = ({ color, size, ...props }) => {
  return (
    <>
      <a href="https://t.me/Roman_Trutnev" target="blank">
        <TG
          {...props}
          style={{
            fill: color ? color : '#fff',
            width: size ? size : '',
            height: size ? size : '',
          }}
        />
      </a>
    </>
  )
}

export default TGComponent
