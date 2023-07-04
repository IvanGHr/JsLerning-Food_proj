'use ctrict';

import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import forms from './modules/forms';
import tabs from './modules/tabs';
import calc from './modules/calc';
import {openModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {//!

    const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 50000);//открывает модальное окно через время как открылась станица пользователем

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2024-01-01');
    forms('form', modalTimerId);
    cards();
    calc();
    slider({
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