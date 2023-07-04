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

export default timer;