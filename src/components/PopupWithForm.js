import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
      id={props.id}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__button-close"
          type="button"
          aria-label="Close"
        ></button>
        <form className="popup__form" id="edit-form" name={props.name} noValidate>
          <h2 className="popup__input-title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit" aria-label="Save">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
