import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  return (
    <body className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          title="Редактировать профиль"
          name={'edit-popup'}
          id={'edit-popup'}
        >
          <input
            name="name"
            placeholder="Имя"
            type="text"
            className="popup__input popup__input_type_name"
            value=""
            minLength="2"
            maxLength="40"
            required
            id="name-input"
            pattern="^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$"
          />
          <span className="popup__error name-input-error"></span>
          <input
            name="position"
            placeholder="О себе"
            type="text"
            className="popup__input popup__input_type_position"
            value=""
            minLength="2"
            maxLength="200"
            required
            id="position-input"
            pattern="^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$"
          />
          <span className="popup__error position-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          title="Новое место"
          name={'add-popup'}
          id={'add-popup'}
        >
          <input
            name="picname"
            placeholder="Название"
            type="text"
            className="popup__input popup__input_type_heading"
            required
            minLength="2"
            maxLength="30"
            id="place-input"
            pattern="^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$"
          />
          <span className="popup__error place-input-error"></span>
          <input
            name="url"
            placeholder="Ссылка на картинку"
            type="url"
            className="popup__input popup__input_type_url"
            required
            id="url-input"
            pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
          />
          <span className="popup__error url-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          title="Обновить аватар"
          name={'avatar-popup'}
          id={'avatar-popup'}
        >
          <input
            name="avatarlink"
            placeholder="Ссылка на аватар"
            type="url"
            className="popup__input popup__input_type_url"
            required
            id="avatar-input"
            pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
          />
          <span class="popup__error avatar-input-error"></span>
        </PopupWithForm>
        <ImagePopup />
      </div>
    </body>
  );
}

export default App;
