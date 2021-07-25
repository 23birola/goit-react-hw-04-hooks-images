import { useEffect } from "react";
import PropTypes from 'prop-types';
import css from './Modal.module.css'

export default function Modal({ onClose, image }) {
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }};

  const handleOverlayClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return (
      <div className={css.overlay} onClick={handleOverlayClick}>
          <div className={css.modal}>
              <img src={image.src} alt={image.alt} width='800' height='600'/>
          </div>
      </div>
  );
  }

Modal.propTypes = {
  image: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};
