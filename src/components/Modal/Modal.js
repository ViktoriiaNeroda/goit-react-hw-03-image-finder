import React from 'react';
import { CloseButton, Overlay, StyledModal } from './Modal.styled';



 export function Modal ({ image, onClose }) {
  
  
  return (
      <Overlay>
          <StyledModal>
              <img src={image} alt="Fullsize" />
                <CloseButton onClick={onClose}>Close</CloseButton>
          </StyledModal>
     </Overlay>
  );
}
