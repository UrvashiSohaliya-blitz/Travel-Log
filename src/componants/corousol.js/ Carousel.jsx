import React from "react";
import { Carousel, Image } from "antd";

const CarouselPlay = ({ images }) => {
  const divstyle = {
    border: "5px solid green",
    marginLeft: "50px",
    width: "100%",
  };
  // const images = [
  //   "https://picsum.photos/700/400",
  //   "https://picsum.photos/id/237/700/400",
  //   "https://picsum.photos/700/400?grayscale",
  //   "https://picsum.photos/700/400.jpg",
  // ];
  return (
    <div>
      {" "}
      <Carousel
        autoplay
        style={{
          // width: "600px",
          height: "450px",
          margin: "auto",
          padding: "2%",
          overflow: "hidden",
        }}
      >
        {images &&
          images.map((e) => (
            <Image
              src={e}
              // width="100%"
              height="410px"
              fallback="https://picsum.photos/700/400.jpg"
            />
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselPlay;
