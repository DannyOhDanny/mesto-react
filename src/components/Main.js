import React from 'react';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getProfileInfoFromServer()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(err => {
        console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`);
      });
  }, [userName, userDescription, userAvatar]);

  useEffect(() => {
    api
      .getCardsFromServer()
      .then(cardsData => {
        setCards(cardsData);
      })
      .catch(err => {
        console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__columns">
          <div className="profile__column-avatar-btn" onClick={props.onEditAvatar}>
            <img className="profile__column-pic" src={userAvatar} alt="Фото профиля" />
          </div>
          <div className="profile__column-bio">
            <div className="profile__row">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__button-edit profile__button-edit_action_edit"
                type="button"
                aria-label="Edit"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__position">{userDescription}</p>
          </div>
          <button
            onClick={props.onAddPlace}
            className="profile__button-add profile__button-add_action_add"
            type="button"
            aria-label="Add"
          ></button>
        </div>
      </section>
      <section className="elements" aria-label="Карточки мест">
        {cards.map(card => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}
export default Main;
