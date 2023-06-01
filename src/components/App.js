import React from 'react';
import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then(data => {
        console.log(data);
        setCurrentUser({
          _id: data._id,
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          cohort: data.cohort
        });
      })
      .catch(err => {
        console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`);
      });
  }, []);

  useEffect(() => {
    api
      .getCardsFromServer()
      .then(cardsData => {
        //console.log(cardsData);
        setCards(cardsData);
      })
      .catch(err => {
        console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`);
      });
  }, [cards]);

  //console.log(currentUser);

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
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .putUserLike(card._id, !isLiked)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Возникла ошибка постановки лайка:${err} - ${err.statusText}`);
        });
    } else {
      api
        .deleteUserLike(card._id, !isLiked)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Возникла ошибка удаления лайка:${err} - ${err.statusText}`);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteUserCard(card._id)
      .then(newCard => {
        //удаляем из массива карточку и сохраняем  новый массив
        const newCards = cards.filter(c => (c._id === card._id ? null : newCard));
        //отрисовываем новый массив
        setCards(newCards);
      })
      .catch(err => {
        console.error(`Возникла ошибка удаления карточки:${err} - ${err.statusText}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <PopupWithForm
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            title="Редактировать профиль"
            id={'edit-popup'}
            btnName={'Сохранить'}
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
            id={'add-popup'}
            btnName={'Создать'}
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
            id={'avatar-popup'}
            btnName={'Сохранить'}
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
            <span className="popup__error avatar-input-error"></span>
          </PopupWithForm>
          <PopupWithForm title="Вы уверены?" id={'delete-popup'} btnName={'Да'}></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
