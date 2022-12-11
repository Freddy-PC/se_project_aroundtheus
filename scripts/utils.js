/* Opens unviewable modal when applied */
export function openModal(modal) {
  modal.classList.add("modal_opened");
  // Why does this have to be here for Escape key to work?
  document.addEventListener("keydown", handleEscape);
}
/* Closes Modal */
export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  /* When the Escape key is pressed closeModal */
  document.removeEventListener("keydown", handleEscape);
}
/* --------------------------- Exit on Escape Key --------------------------- */

export const handleEscape = (evt) => {
  evt.preventDefault();
  escapeCloseModal(evt, closeModal);
};

export function escapeCloseModal(evt, action) {
  const modalOpened = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    action(modalOpened);
  }
}
