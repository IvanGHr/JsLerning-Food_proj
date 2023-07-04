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

export default slider;