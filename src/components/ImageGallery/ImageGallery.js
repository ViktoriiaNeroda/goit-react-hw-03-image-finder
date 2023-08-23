import React, { useState } from 'react';
import { StyledImg, StyledItem, StyledList } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';

export function GaleryImage({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (id) => {
    setSelectedImage(id);
  };

  return (
    <div>
      <StyledList>
        {images.map((image) => (
          <StyledItem key={image.id}>
            <StyledImg
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => handleImageClick(image.id)}
            />
          </StyledItem>
        ))}
      </StyledList>
      {selectedImage !== null && (
        <Modal
          image={images.find((image) => image.id === selectedImage).largeImageURL}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
