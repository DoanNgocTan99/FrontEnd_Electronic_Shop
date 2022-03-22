import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import styles from './Coupon.module.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
function Coupon(props) {
  return (
    <div className={styles.sliderCoupon}>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        //   scrollbar={{ draggable: false }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img
            src="https://shop-redq.vercel.app/_next/static/images/offer-3-2f8285b13bef950f843cb4147666af6e.png"
            alt="CouponImg"
            className={styles.imgCoupon}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://shop-redq.vercel.app/_next/static/images/offer-1-1f7a4c9ea0ba5a216bc7af1f60d044e0.png"
            alt="CouponImg"
            className={styles.imgCoupon}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://shop-redq.vercel.app/_next/static/images/offer-2-90d3534e1ad62a8b8a977f1290e61e9f.png"
            alt="CouponImg"
            className={styles.imgCoupon}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.imgur.com/1Ky5cRH.jpg"
            alt="CouponImg"
            className={styles.imgCoupon}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="http://pics.gmarket.co.kr/mobile.global/welcome_cp2_en.png"
            alt="CouponImg"
            className={styles.imgCoupon}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhzGgwXqRoNA9I3rX38iUWY9G-1-uV0B8yg&usqp=CAU"
            alt="CouponImg"
            className={styles.imgCoupon}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Coupon;
