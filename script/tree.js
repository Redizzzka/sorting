//Пометка
//ноды - это окружности, в которые вставляются переменные из массива


$(function() {
    // Задаем начальные значения для дерева
    let TreeLeaf = function (value, color) {
       this.rightBranch = null;
       this.leftBranch = null;
       this.hilightPath = true;
       this.hilightNode = true;
       this.color = color;
       this.val = value;
       this.id = 0;
    };
 
    // Добавляем цисла в дерево
    TreeLeaf.prototype.insert = function (val) {
       this.hilightPath = true;
       let branch = '';
       let isRightBranch = false;
       //Помещаем значения в правую или левую 'ветку'
       if (this.val < val) {
          branch = 'rightBranch';
          isRightBranch = true;
       } else {
          branch = 'leftBranch'
       }
 
         //Проверяем на пустое значение
       if (this[branch] != null) {
          this[branch].insert(val)
       } else {
          this[branch] = new TreeLeaf(val, isRightBranch ? 'steelblue' : 'lightgreen'); //Задаем цвета для левой и правой 'ветки'
 
          //Свойство 'children' используется для совместимости с d3.js чтобы изменить цвет для линии
          if (this.children === undefined) {
             this.children = [];
          }
          isRightBranch ? this.children.push(this[branch]) : this.children.unshift(this[branch]);
 
          update(this[branch]);
       }
 
       T.clearHighlights()
 
    };
      
    // Проходим по дереву и для каждой ноды применяем функцию
    TreeLeaf.prototype.walk = function (func) {
       if (this.leftBranch != null) {
          this.leftBranch.walk(func)
       }
 
       if(typeof func === 'function') {
          func(this)
       }
 
       if (this.rightBranch != null) {
          this.rightBranch.walk(func);
       }
    };
 
    // Очищаем анимацию после каждого прохода по дереву
    TreeLeaf.prototype.clearHighlights = function(){
       if (this.leftBranch != null) {
          this.leftBranch.clearHighlights()
       }
 
       this.hilightPath = false;
       this.hilightNode = false;
 
       if (this.rightBranch != null) {
          this.rightBranch.clearHighlights();
       }
    };
 
    // Обработка анимации элементов и переходов при добавлении нового элемента (если таковой имеется) в дерево
    function update(nodeToAdd) {
       if (nodeToAdd !== undefined) {
          nodeToAdd.id = nodes.length;
          nodes.push(nodeToAdd);
       }
            
       // Пересчитываем массив и заносим в анимацию
       node = node.data(tree.nodes(root), function (d) {
          return d.id;
       });
       link = link.data(tree.links(nodes), function (d) {
          return d.source.id + "-" + d.target.id;
       });

       // Добавляем элементы массива в ноды
       let nodeEnter = node.enter().append("g")
          .attr("class", "node");
         //Рисуем сами ноды
       nodeEnter.append("circle")
          .attr("class", "node")
          .attr("r", function (d) {
             return 10 + Math.floor(d.val / 10);
          })
          .attr("cx", function (d) {
             return d.parent.px;
          })
          .attr("cy", function (d) {
             return d.parent.py;
          });
 
       // Добавляем текст в ноды
       nodeEnter.append("text")
          .attr("class", "text")
          .attr("x", function (d) {
             return (nodes.length - 1) * 26;
          })
          .attr("y", function (d) {
             return 0;
          })
          .attr("text-anchor", "middle")
          .text(function (d) {
             return d.val;
          });
 
       // Добавляем кривые между нодами
       link.enter().insert("path", ".node")
          .attr("class", "link")
 
          .attr("d", function (d) {
             let o = {x: d.source.px, y: d.source.py};
             return diagonal({source: o, target: o});
          });
 
       // Ноды и кривые переходят на новые позиции
       let t = svg.transition()
          .duration(400);
 
       t.selectAll(".link")
          .attr("d", diagonal).style('stroke', function (d) {
             return d.target.hilightPath ? '#f00' : '#ccc';
          });
 
       t.selectAll(".node")
          .attr("cx", function (d) {
             return d.px = d.x;
          })
          .attr("cy", function (d) {
             return d.py = d.y;
          });
 
 
       t.selectAll("circle").style('stroke', function (d) {
          return d.hilightNode ? '#f00' : d.color;
       });
 
       t.selectAll(".text")
          .attr("x", function (d) {
             return d.x;
          })
          .attr("y", function (d) {
             return d.y + 4;
          });
    }
 
    // Прогон и занесение элементов при прохождении по дереву
    function updateOut(id) {
 
       let textOld = d3.selectAll('text').filter(function (d) {
          if (d !== undefined && id == d.id) {
             return d;
          }
       });
 
       let textToCopy = textOld.data()[0];
 
       let circle = d3.selectAll('circle').filter(function (d) {
          if (id == d.id) {
             return d;
          }
       });
 
         //Анимация для Отсортированного массива
       $('body').queue('mainAnimation', function () {
 
          let text = svg.append("text")
             .attr("class", "text-out")
             .attr("x", textToCopy.x)
             .attr("y", textToCopy.y)
             .attr("text-anchor", "middle")
             .text(textToCopy.val);
 
          circle.transition().duration(400);
 
          text.transition().duration(400).attr("x", "10")
             .attr("y", "990");
 
          
 
          // Забираем значения из дерева и применяем значения для отсортированных чисел
          let numb = textToCopy.val;
          $(`<div>${numb}</div>`).prependTo($('#sortedValues')).animate({width: '20'});
       });
 
    }
    // Создаем массив для сортировки
    let arrayToSort = [];
    for (let i = 0; i < 10; i++) {
       let randomVal = Math.floor(Math.random() * 100);
       arrayToSort.push(randomVal);
       $('#unsortedValues').append($(`<div>${randomVal}</div>`))
    }
    // Создаем само дерево и добавляем значение в переменную root
    let T = new TreeLeaf(arrayToSort.shift());
 
    let margin = {top: 20, right: 10, bottom: 20, left: 10};
 
    let width = 660 - margin.left - margin.right,
       height = 350 - margin.top - margin.bottom;
    //Создаем ноды и приямые, которые будут идти к каждому листочку
    let svg = d3.select("div#svgContainer").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    let tree = d3.layout.tree()
       .size([width - 20, height - 20]);
 
    let root = T,
       nodes = tree(root);
 
    root.parent = root;
    root.px = root.x;
    root.py = root.y;
 
    let diagonal = d3.svg.diagonal(); //Рисуем линки к нодам и сами ноды
 
 
    let node = svg.selectAll(".node"),
       link = svg.selectAll(".link");
 
    // Функция для анимированной сортировки сортировки 
    function initSort() {
      $('div',$('#unsortedValues')).first().css('background-color','#b2b2b2'); //Задаю для первого значения стиль
 
      update(); //Заношу переменную в ноды
 
       arrayToSort.forEach(function (elem, idx) {
 
          $('body').queue('mainAnimation', function () {
             $('div:nth-child(' + (idx + 2) + ')', $('#unsortedValues')).css('background-color', '#b2b2b2');//Задаю для остальных значений тот же стиль
             T.insert(elem);
          });
 
       });
 
 
       $('body').queue('mainAnimation', function () {
 
         //Вывод отсортированного массива
          T.walk(function (leaf) {
             updateOut(leaf.id);
 
          })
       });
 
         //Установка интервала вывода отсортированного массива 
       setInterval(function () {
          $('body').dequeue('mainAnimation')
       }, 600);
    }
    // Задаю функционал кнопкам
    $('button#start').click(function(){
       $(this).attr('disabled','disabled');
       initSort();
    });
 
    $('button#reset').click(function(){
       location.reload();
    });
 });//Могу сделать чуть лучшую анимацию для сортировки пузырьком на d3.js