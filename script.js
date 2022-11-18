'use strict'

/////////////////////////////////////
// Modal Window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnOpenModal = document.querySelectorAll('.btn--show-modal')

const openModel = function () {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

for (let i = 0; i < btnOpenModal.length; i++) {
    btnOpenModal[i].addEventListener('click', openModel);
}
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})