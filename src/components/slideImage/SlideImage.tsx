import { Slide } from 'react-slideshow-image'
import { imagesSlide } from 'src/data/images.dummy'

export interface SlideImageProps {}

export default function SlideImage(props: SlideImageProps) {
  return (
    <Slide autoplay arrows={false} duration={3000}>
      {imagesSlide.map((image, index) => (
        <div
          className='flex items-center justify-center bg-cover bg-center h-screen'
          key={index}
          style={{
            backgroundImage: `url(${image.url})`
          }}
        ></div>
      ))}
    </Slide>
  )
}
