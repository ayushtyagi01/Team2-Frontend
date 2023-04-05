import Carousel from "react-material-ui-carousel";
import "./CarouselContainer.scss";
// import { images } from "../../../../../util/constants/roomImages";

type Props = {
  images: string[];
};

const CarouselContainer = (props: Props) => {
  return (
    <Carousel className="crousel">
      {props.images.map((item) => (
        <img className="crousel__image" src={item} alt="" />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
