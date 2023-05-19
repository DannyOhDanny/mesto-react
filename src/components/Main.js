import React from 'react';

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__columns">
          <div className="profile__column-avatar-btn" onClick={props.onEditAvatar}>
            <img className="profile__column-pic" src="#" alt="Фото профиля" />
          </div>
          <div className="profile__column-bio">
            <div className="profile__row">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button
                className="profile__button-edit profile__button-edit_action_edit"
                type="button"
                aria-label="Edit"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__position">Исследователь океана</p>
          </div>
          <button
            onClick={props.onAddPlace}
            className="profile__button-add profile__button-add_action_add"
            type="button"
            aria-label="Add"
          ></button>
        </div>
      </section>
      <section className="elements" aria-label="Карточки мест"></section>
      <template id="element-template">
        <article className="element">
          <img className="element__pic" />
          <button className="element__delete-btn" aria-label="Delete" type="button"></button>
          <div className="element__title-area">
            <h2 className="element__title"></h2>
            <button className="element__heart" ariaLabel="Like" type="button">
              <p className="element__counter" aria-label="Like-counter"></p>
            </button>
          </div>
        </article>
      </template>
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
