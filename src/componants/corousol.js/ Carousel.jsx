import React from "react";
import { Carousel, Image } from "antd";

const CarouselPlay = ({ images }) => {
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
          images.map((e, i) => (
            <Image
              src={e}
              key={i}
              height="410px"
              //fallback="https://picsum.photos/700/400.jpg"
            />
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselPlay;
