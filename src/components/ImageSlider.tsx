import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

interface ImageObject {
  id: string;
  urls: {
    regular: string;
  };
  user: {
    bio: string;
  };
}

const ImageSlider = () => {
    // slides == images
  const [images, setImages] = useState<ImageObject[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const numberOfImages = images.length

  

  const nextSlide = () => {
      setCurrentImage(currentImage === numberOfImages -1 ? 0: currentImage + 1)
  }

  const prevSlide = () => {
      setCurrentImage(currentImage === 0 ? numberOfImages -1 : currentImage -1)
  }
  console.log(currentImage);
  
  


  const fetchImage = async () => {
    const preloaded = sessionStorage.getItem('images');

    if (preloaded) {
      setImages(JSON.parse(preloaded));
    } else {
      const url = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('images', JSON.stringify(data));
    }
  };


  useEffect(() => {
    fetchImage();
  }, []);

  if(!Array.isArray(images) || images.length <= 0) {
      return null;
  }
  return (
    <section className='slider'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>

      {images.map((image) => {
        return (
          <img key={image.id} src={image.urls.regular} alt={image.user.bio} className='image' />
        );
      })}
    </section>
  );
};

export default ImageSlider;
