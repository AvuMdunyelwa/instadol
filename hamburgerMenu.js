const hamMenu = document.querySelector('#hamburger');
const offScreenMenu = document.querySelector('.off-screen-menu');

function hamburger() {
    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    })

}
hamburger()

export {hamburger}