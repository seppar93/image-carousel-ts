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

  console.log(images);

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <section className='slider'>
        {/* <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/> */}
        {/* <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/> */}

      {images.map((image) => {
        return (
          <img key={image.id} src={image.urls.regular} alt={image.user.bio} />
        );
      })}
    </section>
  );
};

export default ImageSlider;
