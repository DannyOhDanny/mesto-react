import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_image_zoom ${props.card && 'popup_opened'}`} id="image-popup">
      <div className="popup__img-container">
        <button
          onClick={props.onClose}
          className="popup__button-close"
          type="button"
          aria-label="Close"
        ></button>
        <figure className="popup__image">
          <img src={props.card.link} className="popup__pic" alt={props.card.name} />
          <figcaption className="popup__title">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
