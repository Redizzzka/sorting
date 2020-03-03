
  

   
    
       
       

    let array = []
    randomGenerate = document.getElementById('randomGenerate')
    sorting = document.getElementById('sorting')
    out_arr2 = document.getElementById('out_arr2') 
    out_arr = document.getElementById('out_arr') 
        counter = 0
        randomGenerate.onclick = function () {
          array = new Array()
          sorting.removeAttribute('disabled')
          counter = 0
          
            for ( i = 0; i < 10; i++ ) {
              array.push( Math.round( Math.random() * 10000 ))
          
            }
          out_arr2.innerHTML = '<p>Новый массив: <br/>' + array.join(' ') + '</p>'
         }

          sorting.onclick = function () {
           
            sorting.setAttribute('disabled','disabled')
              function sortBubble(arr) {
    
                for (let j = arr.length - 1; j > 0; j--) {
                  for (let i = 0; i < j; i++) {
                    if (arr[i] > arr[i + 1]) {
                      num1 = i; //сохраняем индекс текущего элемента массива
							        num2 = i-1; //сохраняем индекс предыдущего элемента массива
						        	obj1 = $('#out_arr2 .num:eq('+ num1 +')'); //производим выборку текущего числа(шара)
							        obj2 = $('#nums .num:eq('+ num2 +')'); //производим выборку предыдущего числа(шара)	
						        	obj1.swap(obj2); //меняем (визуально) текущий шар (obj1) с предыдущим (obj2)
                      let temp = arr[i]
                      arr[i] = arr[i + 1]
                      arr[i + 1] = temp
                      timeoutID = setTimeout(arguments.callee, 1000)
                      } else {
                        timeoutID = setTimeout(arguments.callee, 0); //выполняем функцию, которая выполняется в данный момент, задав таймер на 0, чтобы не было задержки, когда числа не нужно обменивать
                      } i++
                  } 
                }
              }
              sortBubble(array)
              out_arr2.innerHTML = '<p>Текущий массив: <br/>' + array.join(' ') + ' <br/> Число проходов: </p>' + counter
           }

  
  

// var a = [33, 103, 3, 726, 200, 984, 198, 764, 9];

// function bubbleSort(a) {
//     var swapped;
//     do {
//         swapped = false;
//         for (var i=0; i < a.length-1; i++) {
//             if (a[i] > a[i+1]) {
//                 var temp = a[i];
//                 a[i] = a[i+1];
//                 a[i+1] = temp;
//                 swapped = true;
//             }
//         }
//     } while (swapped);
// }

// bubbleSort(a);
// console.log(a);