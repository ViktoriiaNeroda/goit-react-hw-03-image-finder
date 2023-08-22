import React, { useEffect } from 'react';
import { CloseButton, Overlay, StyledModal } from './Modal.styled';



 export function Modal ({ image, onClose }) {
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

      return () => {
       window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (

      <Overlay onClick={onClose}>
          <StyledModal>
              <img src={image} alt="Fullsize" />
                <CloseButton onClick={onClose}>Close</CloseButton>
          </StyledModal>
     </Overlay>
  );
}
