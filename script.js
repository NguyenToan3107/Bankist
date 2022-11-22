'use strict'

/////////////////////////////////////
// Modal Window
const header = document.querySelector('.header')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnOpenModal = document.querySelectorAll('.btn--show-modal')
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

const btnScrollTo = document.querySelector('.btn--scrool-to')
const section1 = document.querySelector('#section--1')



const openModel = function (e) {
    e.preventDefault()
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

const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookied for improved functionality  and analytics . <button class="btn btn--close-cookie">Got it!</button>'

header.before(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.remove()
})


// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })
    section1.scrollIntoView({
        behavior: 'smooth'
    })
})

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`


// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = el.getAttribute('href')
//         console.log(id)
//         document.querySelector(id).scrollIntoView({
//             behavior: 'smooth'
//         })
//     })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        })
    }
})

// tabs.forEach(function (tab) {
//     tab.addEventListener('click', (e) => {
//         // e.target.classList.add('operations__tab--active')
//         const clicked = e.target.closest('.operations__tab')

//         if (!clicked) return

//         tabs.forEach(t => t.classList.remove('operations__tab--active'))
//         tabsContent.forEach(c => c.classList.remove('operations__content--active'))


//         clicked.classList.add('operations__tab--active')

//         document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

//     })

// })

tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab')

    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))


    clicked.classList.add('operations__tab--active')

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

const handleHover = function (e, opacity) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = opacity
            }
        })
        logo.style.opacity = opacity
    }
}

nav.addEventListener('mouseover', function (e) {
    handleHover(e, 0.5)
})

nav.addEventListener('mouseout', function (e) {
    handleHover(e, 1)
})

// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords)

// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky')
//     }
// })

// const obsOptions = {
//     root: null,
//     threshold: [0, 0.2],
// }

// const obsCallback = function (entries, observe) {
//     entries.forEach(function (entry) {
//         console.log(entry)
//     })
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
    const [entry] = entries
    // console.log(entry)

    if (!entry.isIntersecting) {
        nav.classList.add('sticky')
    } else {
        nav.classList.remove('sticky')
    }
}

const headerObserver = new IntersectionObserver
    (stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`,
    })
headerObserver.observe(header)


// Reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observe) {
    const [entry] = entries
    console.log(entry)

    if (!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden')
    observe.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})

allSections.forEach(function (section) {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})