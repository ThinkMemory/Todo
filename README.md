# Todo
Script programming design class final project
#### 项目结构
├── todo.html

├── todo.css

├── todo.js

└── data.js

#### 代码功能

- [x] ***todo.css***

Todo MVC的网页样式。

- [x] ***todo.html***

Todo MVC的网页主页面代码。主要部分在***body***标签内部，分为三块：***header***、***section***以及***footer***

- ***header***：
```html
<header class="logo">
    <h1>TODO</h1>
    <input class="todo-input" type="text" 
           placeholder="Input what you will do!" 
           autofocus>
</header>
<input class="toggle-all" type="checkbox" style="display: none;">
```
Todo MVC网页的输入部分。包含一个主输入框以及一个全选按钮。全选按钮默认隐藏。

- ***section***：
```html
<section class="main">
    <ul class="items-list"></ul>
</section>
```
Todo MVC网页的主要内容部分，用于将活动词条以便签的形式渲染出来。***ul***标签为活动词条便签渲染容器。
活动词条便签格式如下：

```html
<li id="" class="">
    <div>
        <input class="toggle" type="checkbox">
        <label>{message}</label>
    </div>
    <div style="height: 60px; display: none;"></div>
    <button class="edit" style="display: none;">edit</button>
    <button class="delete" style="display: none;">delete</button>
</li>
```

- ***footer***：
```html
<footer class="footer">
    <span class="items-count">No item left</span>
    <ul class="select-button">
        <li><button class="" style="cursor:pointer;">All</button></li>
        <li><button class="" style="cursor:pointer;">Active</button></li>
        <li><button class="" style="cursor:pointer;">Completed</button></li>
        <li>
            <button id="clear" 
                    style="visibility: hidden; cursor:pointer; font-size: 9px;">
                Clear Completed
            </button>
        </li>
    </ul>
</footer>
```
Todo MVC网页的底部按钮以及提示文字部分。

- [x] ***todo.js***

Todo MVC网页的主要逻辑控制代码。主要包含三大块***window.onload***、***addNewItem()***以及***updateAll()***
- ***window.onload***：

定义网页初始化的相关方法，为一些按钮等标签绑定监听事件。
```javascript
/*1*/
var newItem = $('.todo-input');
newItem.value = data.message;
newItem.addEventListener('keyup', function(event) {/*do something*/}, false);

/*2*/
var checkAll = $('.toggle-all');
checkAll.addEventListener('change', function() {/*do something*/}, false);

/*3*/
var buttonList = $All('.select-button li button');
buttonList.forEach(function(button, index) {
    
    /*check what the button is*/
    
    /*then add listener*/
    button.addEventListener('click', function() {/*do something*/}, false);
});

/*4*/
var clearButton = $('#clear');
clearButton.addEventListener('click', function() {/*do something*/}, false);
```
网页初始加载一共有4个部分需要绑定监听事件。


***1.*** 处是为活动词条输入框绑定输入事件，确认输入完成产生活动词条便签。


***2.*** 处是为全选按钮绑定点击事件，全选按钮点击后全部选中活动词条便签或者全部取消选中。


***3.*** 处是为底部按钮组添加点击事件，由于按钮组中存在***clear***按钮，其点击事件功能与其他按钮不能划分为一类，故在***4.*** 处绑定，所以需要判断是何种按钮。


***4.*** 处是为底部 ***clear*** 按钮绑定清除的点击事件。


- ***updateAll()***：

函数定义网页内容更新时的相关操作。
```javascript
/*1*/
data.items.forEach(function (item, index) {
    /*according to item‘s state call addNewItem() function*/
    
    //call: addNewItem(message, complete, index);
});

/*2*/
$('#clear').style.visibility = completeCont > 0 ? 'visible' : 'hidden';

/*3*/
var differ = data.items.length - completeCont;
$('.items-count').innerHTML = (differ || 'No') + (differ > 1 ? ' items' : ' item') + ' left';

/*4*/
var checkAll = $('.toggle-all');
checkAll.style.display = data.items.length == 0 ? 'none' : '';
checkAll.checked = differ == 0;

/*5*/
$('.todo-input').value = data.message;
```
网页内容更新时一共需要更新5部分的内容。


***1.*** 处是更新活动词条便签。通过判断活动词条便签的状态来调用***addNewItem()*** 函数向网页中添加活动词条便签。


***2.*** 处是根据情况判断***clear***按钮是否显示。


***3.*** 处是对网页底部提示文字部分的内容更新。


***4.*** 处是对网页全选按钮的显示情况以及选中情况的更新。


***5.*** 处是对网页主输入框中的输入文字内容的更新。


- ***addNewItem()***：

函数定义网页活动词条便签的添加，以及对便签的一些标签按钮的监听事件的绑定。
```javascript
/*1*/
itemInput.addEventListener('change', function() {/*do something*/});

/*2*/
itemButton.addEventListener('click', function() {
    var item = this.parentElement;
    var textLabel = item.querySelector('label');
    var flag = false;

    item.classList.add(EDITING);
    hiddenButton(item);

    var editInput = document.createElement('input');
    editInput.classList.add('editInput');
    editInput.type = 'text';
    editInput.value = textLabel.innerHTML;

    function isFinish() {
        if (flag) {
            return;
        }
        flag = true;
        item.removeChild(editInput);
        item.querySelectorAll('div').forEach(function(div, index) {
            if (div.style.display === 'none') {
                div.style.display = '';
            } else if (div.style.display === '') {
                div.style.display = 'none';
            }
        });
        item.classList.remove(EDITING);
    }

    editInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            textLabel.innerHTML = this.value;
            DATA.data.items[index].msg = this.value;
            updateAll();
            //isFinish();
        } else if (event.keyCode === 27) {
            isFinish();
        }
    }, false);

    editInput.addEventListener('blur', function() {
        isFinish();
    }, false);
    
    item.appendChild(editInput);
    item.querySelectorAll('div').forEach(function(div, index) {
        if (div.style.display === 'none') {
            div.style.display = '';
        } else if (div.style.display === '') {
            div.style.display = 'none';
        }
    });
    editInput.focus();
}, false);

/*3*/
itemButton2.addEventListener('click', function() {/*do something*/});

/*4*/
var start
itemLi.addEventListener('touchstart', function(event) {
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT') {
        return;
    }
    if (leftItem && leftItem != this) {
        hiddenButton(leftItem);
        leftItem = null;
    }
    start = event.touches[0].clientX;
}, false);
itemLi.addEventListener('touchmove', function(event) {
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT') {
        return;
    }
    var element = event.currentTarget;
    element.querySelectorAll('button').forEach(function(button, index) { button.style.display = 'none'; });
    var nowTouch = event.touches[0].clientX;
    var left = parseFloat(nowTouch - start);
    if (parseInt(element.style.left) == -120 && left < -120) {
        element.style.left = '-120px';
        return;
    } else if (parseInt(element.style.left) >= 0 && left > 0) {
        element.style.left = '0px';
        return;
    }
    element.style.left = left + 'px';
}, false);
itemLi.addEventListener('touchend', function(event) {
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT') {
        return;
    }
    var element = event.currentTarget;
    var end = parseInt(element.style.left)
    if (end <= -60) {
        element.style.left = '-120px';
        element.querySelectorAll('button').forEach(function(button, index) { button.style.display = ''; });
        leftItem = element;
    }
    if (end > -60) {
        hiddenButton(element);
        leftItem = null
    }  
}, false);
```
网页活动词条便签的添加时，一共需要进行4部分监听事件绑定。在监听事件绑定前需要创建定义好相关的网页标签。在函数的最开头可以看到，此处不再展示。


***1.*** 处是活动词条便签的选中按钮的点击事件绑定。按钮点击更改便签的状态。


***2.*** 处是活动词条便签的编辑按钮的点击事件绑定。按钮点击后出现编辑框，可以进行输入更改词条内容。内部函数***isFinish()*** 为确认编辑完成，取消编辑框。同时内部还绑定有编辑框的输入监听事件以及失去焦点时的监听事件。在此处有一个细节值得注意，那就是获取***div***标签然后更改其***display***属性。从前面的活动词条便签的***html***标签元素可以看到，一共含有两个***div***标签，第一个是便签内容部分的容器标签，第二个是占位标签。当便签处于编辑状态时，通过将内容***div***标签隐藏，占位***div***标签显示的方法，确保输入框的位置以及宽度，为该便签的原始位置以及手机屏幕宽度。


***3.*** 处是活动词条便签的删除按钮的点击事件绑定。按钮点击之后相应活动词条便签将会被删除。


***4.*** 处是活动词条便签的滑动事件绑定。触摸开始、触摸移动、触摸结束，一共三个事件绑定。触摸开始事件中，首先对编辑以及删除按钮的滑动屏蔽，防止与其点击事件冲突，然后通过调用***hiddenButton()*** 函数还原其他已经被滑动的按钮。触摸移动事件中，对滑动情况进行处理，设定左滑上限以及右滑回弹，滑动功能通过设定活动词条便签的组件标签的***left***属性来实现的。触摸结束事件中，更具设定的标签的***left***属性来确定最终的活动词条便签的滑动效果，最多左滑***120px***，禁止右滑。


- ***hiddenButton()***：

```javascript
function hiddenButton(item) {
    item.style.left = '0px';
    item.querySelectorAll('button').forEach(function(button, index) { button.style.display = 'none'; });
}
```
附加辅助函数，用于处理活动便签滑动还原的。便签未被滑动时，编辑和删除按钮是被隐藏的。

- [x] ***data.js***
```javascript
window.DATA = {
    data: {
        items: [/*msg: '', complete: false*/],
        message: '',
        selectText: 'All',
    },
    key: 'TODO',
};

(function() {
    var Data = window.DATA;
    Object.assign(Data, {
        init: function(callback) {
            /*do something*/
            if (callback) callback();
        },
        flush: function(callback) {
            /*do something*/
            if (callback) callback();
        }
    });
})();
```
Todo MVC网页数据持久化功能代码。实际实现采用的是***localstorage***来存储相应数据。

#### 亮点及参考

- 网页风格方面。整体布局沿用[luics的网页前端布局架构](https://github.com/luics/web-dev/blob/master/examples/mobile/TodoMVC.html)，网页样式方面参考[luics的网页样式](https://github.com/luics/web-dev/blob/master/examples/mobile/TodoMVC.css)，但整体风格进行一定的修改，使其更符合手机界面。将活动词条修改为一条一条独立的便签风格，使用户对每一个活动词条的关注更为集中，操作更为方便。
- 便签操作方面。为便签添加滑动功能，将编辑以及删除按钮隐藏，通过滑动调出相应功能按键。这样的操作更加符合手机使用习惯。摒除PC网页的双击编辑操作。
- 编辑框设定。编辑宽度设定为手机屏幕宽度，与原活动词条便签的宽度保持一致，使得手机网页相对固定。该方法是通过设定占位标签来实现的。在上述代码功能中已有提到。
- 便签选中以及全选按钮设计。这两种按钮采用相同设计，未选中时其颜色与网页背景颜色相一致，给人一种便签边上被挖了一个圆形小孔的感觉。当选中时，颜色加深，给人一种小孔被填上的感觉。这一设计，与便签的设计，相适应。活动词条的完成以及未完成，通过便签小孔的填补情况来从侧面体现，符合整体网页风格。
- 网页数据持久化。网页数据持久化的功能参考[luics的localstorage方式](https://github.com/luics/web-dev/blob/master/examples/data/provider-localStorage.js)。数据还原方面，进行了一定的修改，在***todo.js***代码中，对输入框中内容也同时进行了保存以及恢复。即使未将输入框中的内容确定产生活动词条便签，通过刷新网页同样能够完成恢复。这与[luics的localstorage方式的网页](https://github.com/luics/web-dev/blob/master/examples/data/TodoMVC-localStorage.html)有所不同。
- 删除选中活动词条便签优化。[luics的localstorage方式的网页](https://github.com/luics/web-dev/blob/master/examples/data/TodoMVC-localStorage.html)中，删除选中词条是一条一条删除的，通过对[luics的localstorage方式的网页功能代码](https://github.com/luics/web-dev/blob/master/examples/data/TodoMVC.js)的参考以及优化，实现了全部删除的功能。因为原本每一个活动词条便签都设有删除按钮，而***clear***按钮的设计就是为了删除所有的选中的词条。如果采用逐条删除的方式，那么其与每一个词条自带的删除按钮的功能相冲突，为此加以优改进。

#### 项目开源代码及网页地址

- [开源代码](https://github.com/ThinkMemory/Todo)
- [网页地址](https://thinkmemory.github.io/Todo/todo)
