/* --------------------------------- import --------------------------------- */

/* ------------------------------ declarations ------------------------------ */
const imageModal = document.querySelector("#modal-image-popup");

/* -------------------------------- functions ------------------------------- */
// function openModal(modal) {
//   modal.classList.add("modal_open");
//   document.addEventListener("keydown", closeModalWithEsc);
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
// }

// function closeModalOnRemoteClick(e) {
//   const isOutside = !e.target.closest(".modal__content");

//   if (isOutside) {
//     const openedModal = document.querySelector(".modal_open");
//     closeModal(openedModal);
//   }
// }

// function closeModalWithEsc(e) {
//   if (e.key === "Escape") {
//     const openedModal = document.querySelector(".modal_open");
//     closeModal(openedModal);
//   }
// }
// function closeModal(modal) {
//   modal.classList.remove("modal_open");
//   document.removeEventListener("keydown", closeModalWithEsc);
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
// }

/* --------------------------------- exports -------------------------------- */
export {
  // closeModalOnRemoteClick,
  // closeModalWithEsc,
  // closeModal,
  // openModal,
  imageModal,
};
