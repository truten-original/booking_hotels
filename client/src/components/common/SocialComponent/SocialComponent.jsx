import { Box } from '@mui/system'
import VKComponent from '../../SvgComponents/VKComponent'
import GitHubComponent from '../../SvgComponents/GitHubComponent'
import TGComponent from '../../SvgComponents/TGComponent'

const SocialComponent = () => {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <VKComponent className="svg_icon" />
      <GitHubComponent className="svg_icon" />
      <TGComponent className="svg_icon" />
    </Box>
  )
}

export default SocialComponent
