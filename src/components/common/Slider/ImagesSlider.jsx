import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import classes from './ImagesSlider.module.scss'
const ImagesSlider = ({ size, images }) => {
  const [width, setWidth] = useState(0)
  const carousel = useRef()
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])
  return (
    <div>
      <motion.div
        className={classes.carousel}
        ref={carousel}
        whileTap={{ cursor: 'grabbing' }}
        style={{ maxWidth: size }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className={classes.inner_carousel}
        >
          {images.map((image) => (
            <motion.div key={image} className={classes.carousel_item}>
              <img src={image} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ImagesSlider
