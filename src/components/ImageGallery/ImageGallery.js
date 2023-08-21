import React, { useState } from 'react';
import { StyledImg, StyledItem, StyledList } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';

export function GaleryImage({ images }) {

    const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div>
      <StyledList>
        {images.map((image, index) => (
          <StyledItem key={image.id}>
            <StyledImg src={image.webformatURL} alt={image.tags} onClick={() => handleImageClick(index)}/>
          </StyledItem>
        ))}
          </StyledList>
          {selectedImage !== null && (
              <Modal image={images[selectedImage].largeImageURL} onClose={() => setSelectedImage(null)}
              />
         )} 
    </div>
  );
}
