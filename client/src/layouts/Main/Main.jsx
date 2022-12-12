import { Container } from '@mui/system'
import ImagesSlider from '../../components/UI/Slider/ImagesSlider'
import images from '../../assets/images/sliderImages/sliderImages'
import classes from './Main.module.scss'
const Main = () => {
  return (
    <div className={classes.container}>
      <Container className="title_container">
        <div>
          <h4 className="title">Позаботимся о вашем комфорте</h4>
        </div>
        <div className="slider_container_main">
          <ImagesSlider size="500px" images={images} />
        </div>
      </Container>
    </div>
  )
}

export default Main
