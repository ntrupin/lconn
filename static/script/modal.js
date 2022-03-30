const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms
let visibleModal = null;

const toggleModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById(event.target.getAttribute('data-target'));
    (typeof(modal) != 'undefined' && modal != null)
        && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

const isModalOpen = modal => {
    return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

const openModal = (modal) => {
    document.documentElement.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        visibleModal = modal;
        document.documentElement.classList.remove(openingClass);
    }, animationDuration);
    console.log(modal)
    modal.setAttribute('open', true);
}

const closeModal = (modal) => {
    visibleModal = null;
    document.documentElement.classList.add(closingClass);
    setTimeout(() => {
        document.documentElement.classList.remove(closingClass, isOpenClass);
        modal.removeAttribute('open');
    }, animationDuration);
}
  
document.addEventListener('click', event => {
    if (visibleModal != null) {
        const modalContent = visibleModal.querySelector('article');
        const isClickInside = modalContent.contains(event.target);
        !isClickInside && closeModal(visibleModal);
    }
});
  
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && visibleModal != null) {
        closeModal(visibleModal);
    }
});