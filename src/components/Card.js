import React from 'react';
import iconLike from '../images/element_heart.svg';
import iconDelete from '../images/element_delete-pic.svg';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article key={props.card._id} className="element" data-card-id={props.card._id}>
      <img
        onClick={handleClick}
        className="element__pic"
        src={props.card.link}
        alt={props.card.name}
      />
      <button
        style={{ backgroundImage: `url(${iconDelete})` }}
        className="element__delete-btn"
        aria-label="Delete"
        type="button"
      ></button>
      <div className="element__title-area">
        <h2 className="element__title">{props.card.name}</h2>
        <button
          style={{ backgroundImage: `url(${iconLike})` }}
          className="element__heart"
          aria-label="Like"
          type="button"
        >
          <p className="element__counter" aria-label="Like-counter">
            {props.card.likes.length}
          </p>
        </button>
      </div>
    </article>
  );
}

export default Card;
