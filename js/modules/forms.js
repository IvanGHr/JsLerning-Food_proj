import { closeModalWindow, openModalWindow } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    //Скрипт отправки данных на сервер Формы

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        fail: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();//отменяет дефолтное взаимодействие со страницей

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);
            //Для нормального взаимодействия с input в HTML нужно всегда указывать name=""; иначе мы не сможем сформировать путь взаимодействия
            /* request.setRequestHeader('Content-type', 'multipart/form-data'); когда используется связка XMLHttpRequest() + formData() нам не нужно устанавливать заголовок*/
            //а при использовании формата json нужно указывать заголовок
            const formData = new FormData(form);

            //берем formData превращаем её в масив массивов => после превращаем в объект => после превразаем в JSON файл
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            /* const obj = {a: 23, b: 50};
            console.log(Object.entries(obj)); */

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.fail);
            }).finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModalWindow('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalWindow('.modal');
        }, 4000);
    };
}

export default forms;