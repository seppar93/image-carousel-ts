import React, { useEffect, useState } from 'react'

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
    const [images,setImages] = useState<ImageObject[]> ([])
    const fetchImage = async () => {
        

        const preloaded = sessionStorage.getItem('images')
        
        if(preloaded) {
            setImages(JSON.parse(preloaded))

            
        } else {
            const url = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_API_KEY}`
            const response = await fetch(url)
            const data = await response.json()
        console.log(data);
        sessionStorage.setItem('images', JSON.stringify(data))
            
        }
    }

    console.log(images);
    

    useEffect(() => {
        fetchImage()
    
    }, [])
    

  return (
    <div>
        {
            images.map((image) => {
                return (
                    <img key={image.id} src={image.urls.regular} alt={image.user.bio} />
                )
            })
        }
    </div>
  )
}

export default ImageSlider