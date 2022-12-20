import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import { Box } from '@mui/system'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const ImagesSlider = ({ size, images }) => {
  return (
    <Box sx={{ maxWidth: size }}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#eee',
          '--swiper-pagination-color': '#eee',
        }}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        pagination
        spaceBetween={50}
        slidesPerView={1}
      >
        {images.map((i) => (
          <SwiperSlide key={i} className="swiper-slide">
            <img src={i} alt="rooom img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default ImagesSlider
