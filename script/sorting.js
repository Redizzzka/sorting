$(document).ready(function(){
	let i,change_obj,num1,num2,step,obj1,obj2,intervalID,timeoutID
	let array = [] //массив

	//Генерация случайных чисел
	$('.randomGenerate').click(function(){
		$('.sorting').removeAttr('disabled').show() //делаем кнопку сортировки активной
		$('#numbers,#info p').html('') //удаляем предыдущий массив и данные о состоянии сортировки
		
		
		clearTimeout(timeoutID) //отмена выполнения таймера
		clearInterval(intervalID) //отмена выполнения интервала
		
		//Заполнение случайными числами
		for (i = 0; i < 10; i++) {
			randomNum = Math.round((Math.random() * 100)) //случайное число от минимального до максимального
			$('#info .last_massiv').append(randomNum + ' ') //заполнение блока с исходными данными случайными числами
			array[i] = randomNum //заполнение массива случайными числами
			$('#numbers').append('<div class="num">' + randomNum + '</div>') //генерация "шаров" с числами
		}
	});

	//Сортировка чисел через кнопку
	$('.sorting').click(function(){
		$('#info .cur_step').show() //информация о номере текущего прохода
		$(this).attr('disabled','disabled') //делаем кнопку "Отсортировать числа" неактивной
		step = 1 //задаем начальное значение для количество проходов

		//функция сортировки
		function sorting() {
			
			//проверяем количество выполненных проходов, чтобы остановить сортировку, когда выполнено 10 проходов
			if( step < 11 ){
				$('#info .cur_step').text('Текущий проход: ' + step + '/10') //выводим номер текущего прохода
				step++ //увеличиваем значение проходов
				i = 1 //задаем проход по каждому числу
				$('#info .total').text('Идет сортировка...');
			
				
				(function() {
					if (i < 10) { 
						if(array[i] < array[i-1] ){ 
							num1 = i
							num2 = i-1 
							obj1 = $('#numbers .num:eq('+ num1 +')')
							obj2 = $('#numbers .num:eq('+ num2 +')')	
							obj1.swap(obj2); //меняем (визуально) (obj1) с (obj2)
							
							//обмениваем числа в массиве
							change_obj = array[i]
							array[i] = array[i-1]
							array[i-1] = change_obj
							
							timeoutID = setTimeout(arguments.callee, 700) //выполняем обмен с задержкой в 0.7
						} else {
							timeoutID = setTimeout(arguments.callee, 0) //Если не надо обменивать число, то время задержки 0
						}
						    i++	
					} else { //если все числа проверены, то отменяем задачу на выполнение интервала
						clearInterval(intervalID) 
						sorting()  //запускаем функцию сортировки
						intervalID = setInterval(sorting, 7000) //запускаем выполнение функции sorting с интервалом в 7 секунд
					}
				})()
			} else {
				clearTimeout(timeoutID)
				clearInterval(intervalID) 
				$('#info .total').text('Сортировка окончена!')
				$('#info .cur_step').hide() //скрываем проходы, когда закончила работу функция
			}
		}
		sorting()
	});
});