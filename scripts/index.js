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
//Edit button
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileEditExitButton = editProfileModal.querySelector(
  ".modal__exit-button"
);
//Input fields in Edit button
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_descripion"
);
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
//Add button
const cardAddModal = document.querySelector("#add-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddCloseBtn = cardAddModal.querySelector(".modal__exit-button");
const cardAddForm = document.querySelector("#add-card-form");
// Image Select
const viewCardModal = document.querySelector("#image-modal");
const viewCardEl = viewCardModal.querySelector(".modal__image");
const viewCardExitButton = viewCardModal.querySelector(".modal__exit-button");
const viewCardCaption = viewCardModal.querySelector(".modal__caption");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  cardListEl.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// Opens unviewable modal when applied
function openModal(modal) {
  modal.classList.add("modal_opened");
  // Why does this have to be here for Escape key to work?
  document.addEventListener("keydown", handleEscape);
}
// Closes Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // When the Escape key is pressed closeModal
  document.removeEventListener("keydown", handleEscape);
}

editProfileButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openModal(editProfileModal);
});

profileEditExitButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

cardAddButton.addEventListener("click", function (evt) {
  openModal(cardAddModal);
});

cardAddCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

//Card listener
viewCardExitButton.addEventListener("click", () => {
  closeModal(viewCardModal);
});
/* --------------------------- Exit on Escape Key --------------------------- */
const handleEscape = (evt) => {
  evt.preventDefault();
  escapeCloseModal(evt, closeModal);
};

function escapeCloseModal(evt, action) {
  const modalOpened = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    action(modalOpened);
  }
}
/* --------------- Exit Clicking Overlay/outside Modal Window --------------- */
/* When the outside of a modal window is clicked it closes */
const modalWindows = Array.from(document.querySelectorAll(".modal"));
modalWindows.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    closeModal(evt.target);
  });
});

profileEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;
  //Input fields will equal its past input
  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  // Closes editProfileModal (after input fields have a value & save button is pressed)
  closeModal(editProfileModal);
});

cardAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Grabs input name's value from "title" and "link" in modal
  const name = event.target.title.value;
  const link = event.target.link.value;
  const cardView = createCard({
    name,
    link,
  });
  renderCard(cardView, cardListEl);
  closeModal(cardAddModal);
  cardAddForm.reset();
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
  // Add event-listener for like button
  //Why does card__like-button_active with no period work???
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });
  // Add event-listener for delete button
  const cardDeleteBtn = cardEl.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });
  // Opens Image when clicked
  imageEl.addEventListener("click", () => {
    viewCardEl.src = data.link;
    viewCardEl.alt = data.name;
    viewCardCaption.textContent = data.name;
    openModal(viewCardModal);
  });
  // Give finished element
  return cardEl;
}
// Initialcards are in order when reversed from prepend in line 124
initialCards.reverse().forEach(function (cardData) {
  const cardView = createCard(cardData);
  renderCard(cardView, cardListEl);
});
