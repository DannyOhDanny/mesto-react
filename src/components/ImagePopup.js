import React from 'react';

function ImagePopup() {
  return (
    <div className="popup popup_image_zoom" id="image-popup">
      <div className="popup__img-container">
        <button className="popup__button-close" type="button" aria-label="Close"></button>
        <figure className="popup__image">
          <img className="popup__pic" />
          <figcaption className="popup__title"></figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
