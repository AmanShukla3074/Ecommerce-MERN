import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HomeCarousel.css'

import img1 from "../Imgs/instinct_first.webp"
import img2 from "../Imgs/notty_copy.jpg"
import img3 from "../Imgs/they_kryppp_copy.jpg"

const items = [
    // <img src="https://crepdogcrew.com/cdn/shop/files/they_kryppp_copy.jpg?v=1720789882&width=2000" alt="" className='carousel-Img'/>,
    // <img src="https://crepdogcrew.com/cdn/shop/files/notty_copy.jpg?v=1721050201&width=2000" alt="" className='carousel-Img'/>,
    // <img src="https://crepdogcrew.com/cdn/shop/files/instinct_first.png?v=1721817009&width=2000" alt="" className='carousel-Img'/>

    <img src={img1} alt="" className='carousel-Img'/>,
    <img src={img2} alt="" className='carousel-Img'/>,
    <img src={img3} alt="" className='carousel-Img'/>
];

const HomeCarousel = () => (
    <AliceCarousel
        items={items}
        disableButtonsControls
        disableDotsControls
        autoPlay
        autoPlayInterval={1500}
        infinite
    />
);

export default HomeCarousel