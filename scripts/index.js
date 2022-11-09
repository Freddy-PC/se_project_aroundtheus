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
const profileEditModal = document.querySelector("#edit-modal");
const profileEditExitButton = profileEditModal.querySelector(
  ".modal__exit-button"
);
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const cardAddModal = document.querySelector("#add-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddCloseBtn = cardAddModal.querySelector(".modal__exit-button");
const cardAddForm = document.querySelector("#add-card-form");

const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_descripion"
);

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// May open profileEditModal & cardAddModal (must be specified)
function openModal(modal) {
  modal.classList.add("modal_opened");
}
// May close profileEditModal & cardAddModal
function closeModal(modal) {
  modal.classList.remove("modal_opened"); //
}

editProfileButton.addEventListener("click", function (evt) {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openModal(profileEditModal);
});

profileEditExitButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

cardAddButton.addEventListener("click", function (evt) {
  openModal(cardAddModal);
});

cardAddCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

profileEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  // Closes profileEditModal (after input fields have a value & save button is pressed)
  closeModal(profileEditModal);
});

cardAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Grabs input name's value from "title" in modal
  const name = event.target.title.value;
  const link = event.target.link.value;
  const cardView = createCard({
    name,
    link,
  });
  renderCard(cardView, cardListEl);
  closeModal(cardAddModal);
});

//Renders new cards
function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

// Creates card
function createCard(data) {
  // Clone template
  const cardEl = cardTemplate.cloneNode(true);
  // Find .card__image
  const imageEl = cardEl.querySelector(".card__image");
  // Find .card__title
  const cardTitle = cardEl.querySelector(".card__title");
  // Replace image src
  imageEl.src = data.link;
  // Replace image alt
  imageEl.alt = data.name;
  // Replace title
  cardTitle.textContent = data.name;
  // Add event-listener for like button. Why does card__like-button_active with no period work???
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });
  // Add event-listener for delete button
  const cardDeleteBtn = cardEl.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });
  // Give finished element
  return cardEl;
}

initialCards.forEach(function (cardData) {
  const cardView = createCard(cardData);
  renderCard(cardView, cardListEl);
});
