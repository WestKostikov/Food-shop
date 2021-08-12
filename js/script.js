window.addEventListener('DOMContentLoaded', function() { // назначение глобального обработчика событий (DOMContentLoaded)
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
});