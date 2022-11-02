import { Container } from "@mui/system"
import ImagesSlider from "../../components/common/Slider/ImagesSlider"
import images from "../../assets/images/sliderImages/sliderImages"
import classes from "./Main.module.scss"
const Main = () => {
  return (
    <div className={classes.container}>
      <Container>
        <div
          style={{
            color: "white",
            paddingTop: "100px",
            fontSize: "40px",
            textDecorationStyle: "italic",
            width: "33%",
          }}
        >
          <h3>Позаботимся о вашем комфорте</h3>
        </div>
        <div className={classes.slider_container}>
          <ImagesSlider size="500px" images={images} />
        </div>
      </Container>
    </div>
  )
}

export default Main
