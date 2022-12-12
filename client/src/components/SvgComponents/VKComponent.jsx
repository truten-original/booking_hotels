import { ReactComponent as VK } from '../../assets/images/svg/social/vk.svg'
const VKComponent = ({ color, size, ...props }) => {
  return (
    <a href="https://vk.com/r.trutnev" target="blank">
      <VK
        {...props}
        style={{
          fill: color ? color : '#fff',
          width: size ? size : '',
          height: size ? size : '',
        }}
      />
    </a>
  )
}

export default VKComponent
