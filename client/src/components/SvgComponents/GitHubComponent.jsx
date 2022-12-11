import { ReactComponent as GitHub } from '../../assets/images/svg/social/github.svg'
const GitHubComponent = ({ color, size, ...props }) => {
  return (
    <a href="https://github.com/truten-original" target="blank">
      <GitHub
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

export default GitHubComponent
