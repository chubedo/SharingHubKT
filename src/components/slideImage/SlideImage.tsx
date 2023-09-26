import { Slide } from 'react-slideshow-image'
import { imagesSlide } from 'src/data/images.dummy'

export interface SlideImageProps {}

export default function SlideImage(props: SlideImageProps) {
  return (
    <Slide autoplay arrows={false} duration={2500}>
      {imagesSlide.map((image, index) => (
        <div
          className='flex items-center justify-center bg-cover bg-center h-[calc(100vh_-_2rem)]'
          key={index}
          style={{
            backgroundImage: `url(${image.url})`
          }}
        ></div>
      ))}
    </Slide>
  )
}
