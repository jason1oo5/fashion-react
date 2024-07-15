import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { configState } from "../reducers/configSlice";

export default function LoopSlider(props: any) {
  const { sliderImg } = props;
  const { s3Auth } = useSelector(configState);
  const sm = useMediaQuery("(max-width:750px)");
  const md = useMediaQuery("(min-width:1500px)");

  const getPerView = () => {
    if (md) {
      return 3;
    } else if (sm) {
      return 1;
    } else {
      return 2;
    }
  };

  return (
    <>
      {sliderImg && (
        <Swiper
          slidesPerView={getPerView()}
          spaceBetween={30}
          slidesPerGroup={getPerView()}
          loop={true}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {sliderImg.map((item: any, index: number) => (
            <SwiperSlide key={item.path + index}>
              <img
                // src={item.path}
                src={
                  process.env.REACT_APP_S3BASEURL +
                  item.path +
                  "?Authorization=" +
                  s3Auth.authorizationToken
                }
                width={"33%"}
                // alt={item.title}
                loading="lazy"
                style={{
                  borderRadius: "3px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
