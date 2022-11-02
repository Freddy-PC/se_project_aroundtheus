const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".modal");
const profileExitButton = document.querySelector(".modal__exit-button");
const profileEditForm = document.querySelector("#edit-profile-form");

const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_descripion"
);

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Open Profile
function openModal() {
  profileEdit.classList.add("modal_opened");
}
// Close Profile
function closeModal() {
  profileEdit.classList.remove("modal_opened");
}

editProfileButton.addEventListener("click", function (evt) {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openModal();
});

profileExitButton.addEventListener("click", closeModal);

profileEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closeModal();
});

//Creates card
function createCard(data) {
  const cardEl = cardTemplate.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  imageEl.src = data.link;
  imageEl.alt = data.name;
  cardTitle.textContent = data.name;
  return cardEl;
}
//Renders new cards
function renderCard(data) {
  const cardEl = createCard(data);
  cardListEl.appendChild(cardEl);
  cardListEl.append(cardEl);
}

initialCards.forEach(renderCard);

/*
 *Old unorganized way of making andrendering new cards
initialCards.forEach(function (cardData) {
  const cardEl = cardTemplate.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardListEl.appendChild(cardEl);
});
*/
