function openModalWindow(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';//позволяет не скролить сайт пока открыто модальное окно

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);//убирает появление модального окна через время (таймер)
    }
}

function closeModalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'none';
    document.body.style.overflow = '';//восстанавливает скролинг страницы по дефолту
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Модальное окно

    const modal = document.querySelector(modalSelector),
          openModal = document.querySelectorAll(triggerSelector);

    openModal.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
    });

    //позволяет закрывать модальное окно, если пользователь нажал на серую зону вокруг него
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    //позволяет убрать модальное окно если нажать определенную кнопку (в данном случае ESC)
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === 'block') {
            closeModalWindow(modalSelector);
        }
    });

    function showModalScroll () {
        //Если прокрутка ползунка сайта + контент страницы >= всему контенту (то есть если пользователь долистал сайт в самый низ)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModalWindow(modalSelector, modalTimerId);//показываем модальное окно
            window.removeEventListener('scroll', showModalScroll);//после чего убираем обработчик событий
        }
    }

    window.addEventListener('scroll', showModalScroll);
}

export default modal;
export {closeModalWindow};
export {openModalWindow};