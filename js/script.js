window.addEventListener('DOMContentLoaded', function() { // назначение глобального обработчика событий (DOMContentLoaded)

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'), // получаем все вкладки (табы)
        tabsContent = document.querySelectorAll('.tabcontent'), // получаем весь контент, который находится в вёрстке
        tabsParent = document.querySelector('.tabheader__items'); // получаем родителя, который содержит все табы

    function hideTabContent() { // создаём функцию, которая скрывает все ненужные табы
        
        tabsContent.forEach(item => { // перебераем псевдо-массив. item - внутри будет каждый отдельный контент. (ниже будет комбинация добавления и удаления классов)
            item.classList.add('hide'); // добавляем класс hide (скрытие элементов)
            item.classList.remove('show', 'fade'); // удаляем классы show и fade (fade - класс анимации переключения)
        });

        tabs.forEach(item => { // обращаемся к каждому отдельному табу
            item.classList.remove('tabheader__item_active'); // у каждого из элементов табов удаляем класс активности 
        });
	}

    function showTabContent(i = 0) { // создаём функцию, которая показывает табы. Присваиваем i ноль (ES6), 
        tabsContent[i].classList.add('show', 'fade'); // добавляем классы show и fade (fade - класс анимации переключения)
        tabsContent[i].classList.remove('hide'); // удаляем у нужного элемента класс hide (скрытие)
        tabs[i].classList.add('tabheader__item_active'); // добавление класса активности для конкретного элемента таба (i)
    }
    
    hideTabContent(); // вызываем функцию, скрывающую табы (по умолчанию использует аргументы(i = 0)(это фишка ES6))
    showTabContent(); // вызываем функцию, показывающую табы

	tabsParent.addEventListener('click', function(event) { // делегирование событий, назначаем обработчик событий клика ('ckick'), создаём коллбэк функцию с объектом события event
		const target = event.target; // создаём переменную target для частого использования event.target 
		if(target && target.classList.contains('tabheader__item')) { // создаём условие, проверяем target, потом target.classList и при помощи contains определяем что мы точно кликнули таб
            tabs.forEach((item, i) => { // перебераем все табы, которые находятся в переменной tabs (псевдо-массив), вызывая коллбэк функцию с 2 аргументами (item - каждый таб, i - номер элемента по порядку перебора)
                if (target == item) { // условие, если target (тот элемент, в который мы только что кликнули) будет совпадать с элементом, который мы сейчас перебераем
                    hideTabContent(); // то мы вызываем эту функцию (скрываем ненужные табы)
                    showTabContent(i); // и эту функцию (i - номер того элемента, который совпал с условием, т.е. если мы кликнули в 3тий таб, то у нас перебераются все табы, дошли до 3тьего и тот который нужен показывается, а все остальные скрываются) (показываем нужные табы)
                }
            });
		}
	});

    // Timer

    const deadline = '2020-05-11'; // создаём отправную точку (создаём переменную, которая определяет дату в виде строки)

    function getTimeRemaining(endtime) { // создаём функцию для определения разницы между deadline и текущим временем 
        const t = Date.parse(endtime) - Date.parse(new Date()), // создаём локальную переменную t, в ней Date.parse(endtime) получает количество миллисекунд, которое будет в конечном времени до которого нужно досчитать и дальше нам нужно найти разницу, поэтому мы отнимаем Date.parse(new Date()) (определяем разницу между датами). При запуске функции получаем разницу между датами в количестве миллисекунд. 
            days = Math.floor( (t/(1000*60*60*24)) ), // считаем количество дней, которые будут отображаться в таймере (берём количество миллисекунд и делим на количество миллисекунд, которые находятся в одном дне и округляем (чтобы не было дробных значений, благодаря Math.floor))
            seconds = Math.floor( (t/1000) % 60 ), // всё как и в других примерах 
            minutes = Math.floor( (t/1000/60) % 60 ), // вначале получаем кол-во секунд, потом делим на 60 и получаем кол-во минут и делим на 60
            hours = Math.floor( (t/(1000*60*60) % 24) ); // берём количество миллисекунд, которые остались в разнице (t), делим на кол-во миллисекунд, которые находятся в одном часе, знак (оператор) % делит первый аргумент (t/(1000*60*60) на 24 (часа) и возвращает остаток от деления. Получаем хвостик, которого не хватает до полных суток (благодаря оператору %)

        return { // используем оператор return для возврата объекта, фигурными скобками создаём объект 
            'total': t, // помещаем в свойство 'total' значение переменной t
            'days': days, // помещаем в свойство 'days' значение переменной days 
            'hours': hours, // помещаем в свойство 'hours' значение переменной hours 
            'minutes': minutes, // помещаем в свойство 'minutes' значение переменной minutes 
            'seconds': seconds // помещаем в свойство 'seconds' значение переменной seconds 
        }; 
    }

    function getZero(num){ // создаём функцию, принимающая число
        if (num >= 0 && num < 10) { // если число (num) будет больше или равно 0, и если число будет меньше 10
            return '0' + num; // то функция будет возвращать модифицированное значение 
        } else { // если приходит больше 10
            return num; // нам не нужно ничего модифицировать, мы просто возвращаем это число (возвращается без каких либо изменений и записывается на страницу)
        }
    }

    function setClock(selector, endtime) { // создаём функцию с двумя аргументами, которая устанавливает таймер/часы на страницу 

        const timer = document.querySelector(selector), // создаём переменные в которые помещаем элементы со страницы, первая это timer. Обращаемся к документу и с помощью querySelector находим элемент (с HTML файла)
            days = timer.querySelector("#days"), // далее создаём переменные, где обращаемся к первой переменной и внутри него ищем уникальные id ("#days")
            hours = timer.querySelector('#hours'), // всё как days
            minutes = timer.querySelector('#minutes'), // всё как days
            seconds = timer.querySelector('#seconds'), // всё как days
            timeInterval = setInterval(updateClock, 1000); // создаём переменную timeInterval, присваиваем ей конструкцию setInterval (которая позволяет запускать определённую функцию через определённое кол-во времени. Функцией выступает updateClock и запуск через каждые 1000 миллисекунд). Запуск функции updateClock каждую секунду (таймер обновляется каждую секунду)

        updateClock(); // вызываем функцию инициализации, которая запуститься один раз, установит текущую дату, потом исчезнет и будет работать setInterval

        function updateClock() { // создаём функцию обновления часов
            const t = getTimeRemaining(endtime); // расчёт времени, которое осталось в данную секунду, функция getTimeRemaining(endtime) будет возвращать объект со всеми данными (t, days, hours etc). Получаем разницу между планированным и текущем временем.

            days.innerHTML = getZero(t.days); // помещаем на страницу элементы days с помощью метода innerHTML (можно заменить textContent) и присваиваем кол-во дней, которые нужно отобразить на странице
            hours.innerHTML = getZero(t.hours); // всё как в days.innerHTML
            minutes.innerHTML = getZero(t.minutes); // всё как в days.innerHTML
            seconds.innerHTML = getZero(t.seconds); // всё как в days.innerHTML

            if (t.total <= 0) { // если значение время вышло (т.е. оно идёт в отрицательную сторону)
                clearInterval(timeInterval); // , то таймер не обновляется (останавливается)
            }
        }
    }

    setClock('.timer', deadline); // вызываем функцию с 2 аргументами, первый это селектор, второй это переменная

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'), // создаём кнопки, которые будут триггерить (вызывать) модальное окно (их будет несколько, поэтому используем querySelectorAll). Data атрибуты прописываются в квадратных скобках
        modal = document.querySelector('.modal'), // создаём переменную, отвечающую за модальное окно
        modalCloseBtn = document.querySelector('[data-close]'); // создаём кнопку, отвечающую за событие модального окна

    modalTrigger.forEach(btn => { // используем метод forEach с аргументом btn (внутри будет кнопка)
        btn.addEventListener('click', openModal); // обращаемся к кнопке методом addEventListener (обработчик события) открывая модальное окно
    });

    function closeModal() { // создаём функцию для закрытия модального окна
        modal.classList.add('hide'); // добавляем класс hide 
        modal.classList.remove('show'); // удаляем класс show
        // Либо вариант с toggle - но тогда назначить класс в верстке
        document.body.style.overflow = ''; // восстанавливаем скролл на странице после закрытия модального окна (оставляя пустые ковычки браузер сам решит что нужно поставить там по дефолту)
    }

    function openModal() {
        modal.classList.add('show'); // добавляем класс show
        modal.classList.remove('hide'); // удаляем класс hide (он может появиться, когда мы закроем модальное окно)
        document.body.style.overflow = 'hidden'; // при открытии модального окна, добавляется стиль, который не позволяет прокручивать страницу
        clearInterval(modalTimerId); // очищаем интервал переменной (открытия модального окна)
    }
    
    modalCloseBtn.addEventListener('click', closeModal); // вызываем функцию, после клика будет вызываться закрытие модального окна

    modal.addEventListener('click', (e) => { // передаём коллбэк функцию с объектом события
        if (e.target === modal) { // если место, куда кликнул пользователь является модальным окном
            closeModal(); // тогда закрывается модальное окно
        }
    });

    document.addEventListener('keydown', (e) => { // вешаем обработчик события на документ, назначаем событие 'keydown' (нажатие на клавишу), создаём коллбэк функцию с объектом события e
        if (e.code === "Escape" && modal.classList.contains('show')) { // если e.code (code - определяет кнопку в данном случае 'Escape', подробнее на Event KeyCodes) равно "Escape" и если содержится модальное окно. Если нажата клавиша Escape и при этом модальное окно открыто, то оно закроется 
            closeModal(); // тогда закрываем модальное окно
        }
    });

    const modalTimerId = setTimeout(openModal, 3000); // создаём переменную внутри которой устанавливаем время открытия модального окна

    function showModalByScroll() { // создаём функцию для всплывания модального окна во время прокрутки страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // если прокрученная часть (window.pageYOffset) плюс видимая часть (которую мы видим в данные момент без прокрутки. document.documentElement.clientHeight) больше или равна document.documentElement.scrollHeight (прокрутка в самый низ страницы)
            openModal(); // тогда всплывает модальное окно
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события (после одного всплывающего окна, при его закрытии больше оно не появится)
        }
    }
    window.addEventListener('scroll', showModalByScroll); // отслеживаем событие scroll и после этого запускаем коллбэк функцию (для всплывания модального окна)
});