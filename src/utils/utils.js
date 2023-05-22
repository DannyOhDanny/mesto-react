//Объект - конфигуратор со свойствами селекторов и классов
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Константы
const elementsContainer = document.querySelector('.elements');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const avatarButtonEdit = document.querySelector('.profile__column-avatar-btn');

//Импуты
const userNameInput = document.querySelector('.popup__input_type_name');
const userPositionInput = document.querySelector('.popup__input_type_position');
const titleInput = document.querySelector('.popup__input_type_heading');
const urlInput = document.querySelector('.popup__input_type_url');

//Секция для картинок
const cardSection = '.elements';

export {
  settings,
  elementsContainer,
  profileButtonAdd,
  profileButtonEdit,
  userNameInput,
  userPositionInput,
  titleInput,
  urlInput,
  cardSection,
  avatarButtonEdit
};
