import React from 'react';
import api from '../utils/api';
import iconLike from '../images/element_heart.svg';
import iconDelete from '../images/element_delete-pic.svg';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getCardsFromServer()
      .then(cardsData => {
        setCards(cardsData);
      })
      .catch(err => {
        console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`);
      });
  }, []);

  console.log(cards);

  React.useEffect(() => {
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
        {cards.map(card => {
          return (
            <article key={card._id} className="element" data-card-id={card._id}>
              <img className="element__pic" src={card.link} alt={card.name} />
              <button
                style={{ backgroundImage: `url(${iconDelete})` }}
                className="element__delete-btn"
                aria-label="Delete"
                type="button"
              ></button>
              <div className="element__title-area">
                <h2 className="element__title">{card.name}</h2>
                <button
                  style={{ backgroundImage: `url(${iconLike})` }}
                  className="element__heart"
                  aria-label="Like"
                  type="button"
                >
                  <p className="element__counter" aria-label="Like-counter">
                    {card.likes.length}
                  </p>
                </button>
              </div>
            </article>
          );
        })}
      </section>
      <div className="popup" id="delete-popup">
        <div className="popup__container">
          <button className="popup__button-close" type="button" aria-label="Close"></button>
          <form className="popup__form" id="delete-form" name="delete-form" noValidate>
            <h2 className="popup__input-title">Вы уверены?</h2>
            <button className="popup__button" type="submit" aria-label="Confirm">
              Да
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Main;
