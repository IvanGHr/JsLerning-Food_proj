import { getResource } from "../services/services";

function cards() {
    //Классы //Rest 

    class MenuBox {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    //Шаблонизация для большого кол-ва карточек

    //чтобы взять с сервера и отправить на сайт все наши карточки с данными
    getResource('http://localhost:3000/menu')//получаем данные из сервера 
    .then(data => {//для того что мы получили с сервера мы определяем что это будет (data)
        data.forEach(({img, altimg, title, descr, price}) => {//для полученной data - это у нас массив мы используем forEach перебор (({деструктуризация объекта}))
            new MenuBox(img, altimg, title, descr, price, '.menu .container').render()//каждый объект будет вызывать конструктор MenuBox(указываем те части деструктуризированного до этого объекта, и путь куда поместить) и потсле метод render()
        });
    });

    //библиотека axios возвращает нам более подробные данные с сервера
    //для работы с библиотеками нужно тщательно читать документацию
    /* axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuBox(img, altimg, title, descr, price, '.menu .container').render()
            });
        }); */

    //это метод для небольшого кол-ва карточек, миожно 1 раз воспользоватся
    /* getResource('http://localhost:3000/menu')//получаем данные из сервера 
        .then(data => createCard(data));//для данных которые получили мы вызвваем функцию которые принимают в себя данные полученные с сервера

    function createCard(data) { //функция, которая принимает в себя данные
        data.forEach(({img, altimg, title, descr, price}) => {//перебираем массив и деструктуризируем внутри массива данные в нашем случае объект
            const element = document.createElement('div');//для каждого объекта(карточки) создаём элемент div
            element.classList.add('menu__item');//для div добавляем класс

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
        });

        document.querySelector('.menu .container').append(element);
    }; */
}

export default cards;