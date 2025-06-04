import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getSlides } from '../service/service'
import 'swiper/css';
import '../CSS/headerSlider.css';
import { Autoplay } from 'swiper/modules';

function HeaderSlider() {
    const [slides, setSlides] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null)

    useEffect(() => {
        async function FetchSlider() {
            const slideData = await getSlides()
            setSlides(slideData)
        }
        FetchSlider()
    }, [])

    const goToSlide = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index) // slideToLoop istifadə edin
        }
    }

    return (
        <div className='My_slider'>
            <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // realIndex
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={slides.length > 2}
                modules={[Autoplay]}
                className="mySwiper">
                {slides.map(item => {
                    return <SwiperSlide key={item.id}><img src={item.Image} alt={item.title} /></SwiperSlide>
                })}
            </Swiper>

            <div className="custom-pagination">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeaderSlider