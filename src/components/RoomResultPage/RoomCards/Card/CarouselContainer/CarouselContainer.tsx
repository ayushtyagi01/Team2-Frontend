import Carousel from 'react-material-ui-carousel'
import './CarouselContainer.scss';
import { images } from '../../../../../util/constants/roomImages';


const CarouselContainer: React.FC = () => {
  return (
    <Carousel className='crousel'>
      {
        images.map((item)=>(<img className='crousel__image' src={item} alt=''/>))
      }
    </Carousel>
  )
};

export default CarouselContainer;
