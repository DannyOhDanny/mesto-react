import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import api from '../utils/api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        console.error(
          `Возникла ошибка загрузки данных пользователя с сервера:${err} - ${err.statusText}`
        );
      });
  }, []);

  useEffect(() => {
    api
      .getCardsFromServer()
      .then(cardsData => {
        setCards(cardsData);
      })
      .catch(err => {
        console.error(
          `Возникла ошибка загрузки данных карточек с сервера:${err} - ${err.statusText}`
        );
      });
  }, [cards]);

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
    !isLiked
      ? api
          .putUserLike(card._id)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(err => {
            console.error(`Возникла ошибка постановки лайка:${err} - ${err.statusText}`);
          })
      : api
          .deleteUserLike(card._id)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(err => {
            console.error(`Возникла ошибка удаления лайка:${err} - ${err.statusText}`);
          });
  }

  function handleCardDelete(card) {
    api
      .deleteUserCard(card._id)
      .then(newCard => {
        //удаляем из старого массива карточку и сохраняем новый массив
        const newCards = cards.filter(c => (c._id === card._id ? null : newCard));
        //отрисовываем новый массив
        setCards(newCards);
      })
      .catch(err => {
        console.error(`Возникла ошибка удаления карточки:${err} - ${err.statusText}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(err => {
        console.error(`Возникла ошибка редактирования профиля:${err} - ${err.statusText}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then(newUrl => {
        setCurrentUser(newUrl);
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Возникла ошибка редактирования аватара:${err} - ${err.statusText}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .setNewCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(err => {
        console.error(`Возникла ошибка добавления карточки:${err} - ${err.statusText}`);
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
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          ></EditProfilePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          ></AddPlacePopup>
          <PopupWithForm
            onClose={closeAllPopups}
            title="Вы уверены?"
            id={'delete-popup'}
            btnName={'Да'}
          ></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
