import React from 'react';
import iconClose from '../images/popup__button-close.svg';
function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={props.id}>
      <div className="popup__container">
        <button
          style={{ backgroundImage: `url(${iconClose})` }}
          onClick={props.onClose}
          className="popup__button-close"
          type="button"
          aria-label="Close"
        ></button>
        <form
          className="popup__form"
          id="edit-form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__input-title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit" aria-label="Save">
            {props.btnName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
