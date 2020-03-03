  let arrayTree = [],
  randomGenerateTree = document.getElementById('randomGenerateTree'),
  sortingTree = document.getElementById('sortingTree'),
  out_arr2 = document.getElementById('out_arr2'),
  out_arr = document.getElementById('out_arr')

  randomGenerateTree.click (() => {
       arrayTree = new Array()
       sortingTree.removeAttribute('disabled')
       for ( i = 0; i < 10; i++ ) {
              arrayTree.push( Math.round( Math.random() * 100 ))
              
             }
         out_arr2.innerHTML = `<p>Новый массив: <br/>${arrayTree.join(' ')}</p>`
          
     })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // let array = []
    // randomGenerate = document.getElementById('randomGenerate')
    // sorting = document.getElementById('sorting')
    // out_arr2 = document.getElementById('out_arr2') 
    // out_arr = document.getElementById('out_arr') 
    //     counter = 0
    //     randomGenerate.onclick = function () {
    //       array = new Array()
    //       sorting.removeAttribute('disabled')
    //       counter = 0
          
    //         for ( i = 0; i < 10; i++ ) {
    //           array.push( Math.round( Math.random() * 10000 ))
          
    //         }
    //       out_arr2.innerHTML = '<p>Новый массив: <br/>' + array.join(' ') + '</p>'
    //      }

    //       sorting.onclick = function () {
           
    //         sorting.setAttribute('disabled','disabled')
    //           function sortBubble(arr) {
    
    //             for (let j = arr.length - 1; j > 0; j--) {
    //               for (let i = 0; i < j; i++) {
    //                 if (arr[i] > arr[i + 1]) {
      
    //                   let temp = arr[i]
    //                   arr[i] = arr[i + 1]
    //                   arr[i + 1] = temp
                  
    //               } 
    //             }
    //           }
    //         }
    //           sortBubble(array)
    //           out_arr2.innerHTML = '<p>Текущий массив: <br/>' + array.join(' ') + ' <br/> Число проходов: </p>' + counter
    //        }

  
  

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