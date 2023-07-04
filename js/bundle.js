/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //Калькуляторы - они всегда разные , так как разные вещи нужно посчитать (разные формулы)

    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'famale';
        localStorage.setItem('sex', 'famale');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSetings(selector, activClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activClass);
            }
        });
    };

    initLocalSetings('#gender div', 'calculating__choose-item_active');
    initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'famale') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            
            if (input.value.match(/\D/g)) {//если в поле вводится не число
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')//получаем данные из сервера 
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)('.modal', modalTimerId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal');
        }, 4000);
    };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModalWindow: () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModalWindow: () => (/* binding */ openModalWindow)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, next, prev, totalCounter, currentCunter, wrapper, field}) {
    //Слайдер

    let sliderCurrent = 1;
    let offset = 0;

    const sliderPrev = document.querySelector(prev),
          slider = document.querySelector(container),
          sliderNext = document.querySelector(next),
          slides = document.querySelectorAll(slide),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCunter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    //Слайдер по типу карусели 

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderCurrent}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderCurrent;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);//каждой точке устанавливается атрибут data-slide-to
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function notNumbers(obj) {//функция которая принимает выражение и удаляет все не цифры
        return +obj.replace(/\D/g, '');
    };

    sliderNext.addEventListener('click', () => {
        if (offset === notNumbers(width) * (slides.length - 1)){//witch = '500px'
            offset = 0;
        } else {
            offset += notNumbers(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderCurrent == slides.length) {
            sliderCurrent = 1;
        } else {
            sliderCurrent++;
        }

        if (slides.length < 10) {
            current.textContent = `0${sliderCurrent}`;
        } else {
            current.textContent = sliderCurrent;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderCurrent - 1].style.opacity = 1;
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0){
            (offset = notNumbers(width) * (slides.length - 1));
        } else {
            offset -= notNumbers(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderCurrent == 1) {
            sliderCurrent = slides.length;
        } else {
            sliderCurrent--;
        }

        if (slides.length < 10) {
            current.textContent = `0${sliderCurrent}`;
        } else {
            current.textContent = sliderCurrent;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderCurrent - 1].style.opacity = 1
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderCurrent = slideTo;
            offset = notNumbers(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${sliderCurrent}`;
            } else {
                current.textContent = sliderCurrent;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[sliderCurrent - 1].style.opacity = 1;
        });
    });

    //Слайдер простой

    /* showSlide(sliderCurrent);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlide(num) {
        if (num > slides.length) {
            sliderCurrent = 1;
        }

        if (num < 1) {
            sliderCurrent = slides.lenght;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[sliderCurrent - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${sliderCurrent}`;
        } else {
            total.textContent = sliderCurrent;
        }
    }

    function plusSlides(n) {
        showSlide(sliderCurrent += n);
    }

    function minusSlides(n) {
        showSlide(sliderCurrent -= n);
    }

    sliderPrev.addEventListener('click', () => {
        minusSlides(-1);
    });

    sliderNext.addEventListener('click', () => {
        plusSlides(+1);
    }); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Табы 
    let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
        const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    //Таймер
    
    function getTimeRemaining (endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());//получаем кол-во мс фильной точки - кол-во мс нынешнего времени
              
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //получаем кол-во дней до конца
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //получаем часы
            minutes = Math.floor((t / 1000 / 60) % 60), //получаем минуты
            seconds = Math.floor((t / 1000) % 60);//получаем секунды
        }

        return {
            'total': t,//выводит точное кол-во мс которое осталось
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZeroStart(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);//задаем интервал обновления каждую секунду
        
        updateClock();//вызываем здесь функцию вывода чтобы не ждать 1 секунду пере обновлением интервала

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZeroStart(t.days);
            hours.innerHTML = getZeroStart(t.hours);
            minutes.innerHTML = getZeroStart(t.minutes);
            seconds.innerHTML = getZeroStart(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
//Создаем функцию, работы с сервером и async указывает что в функции будет асинхронный код, и там где мы ставим await - это показывает выполнение какого действия мы должны дождатся перед выполнением следующего (async await работают вместе)
const postData = async (url, data) => {//кол бек функция , которая отправляет(ссылку, и объект с которым будет работать)
    const res = await fetch(url, {//создается переменная в которую помещается обработчик событий fetch(принимает ссылку, и объект в котором указываются параметры что делать с этой ссылкой)
        method: 'POST',//параметр который указывает что мы делаем (отправляем, получаем...) данные с сервера
        headers: { //параметр который указывает с каким форматом данных мы будем работать 
            'Content-type': 'application/json'//в данном случае json файлы
        },
        body: data //параметр указывающий что мы делаем с файлами которые получили или отправили
    });

    return await res.json();//а здесь мы возвращаем промис объект в формате json 
};

async function getResource(url) {//кол бек функция , которая получает(ссылку)
    let res = await fetch(url);

    if (!res.ok) {//Если с запросом что то не так ! - оператор не, .ok свйоство , которое проверяет fetch() и убеждается что все в порядке
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)//throw - выкинуть , ошибку ( с текстом)
    }

    return await res.json();//а здесь мы возвращаем промис который будет превращать все полученные данные в js файл
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
'use ctrict';










window.addEventListener('DOMContentLoaded', () => {//!

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)('.modal', modalTimerId), 50000);//открывает модальное окно через время как открылась станица пользователем

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2024-01-01');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        totalCounter: '#total',
        currentCunter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slide-inner'
    });

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map