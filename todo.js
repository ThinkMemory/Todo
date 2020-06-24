var $ = function(str) {
    return document.querySelector(str);
};

var $All = function(str) {
    return document.querySelectorAll(str);
};

var COMPLETE = 'complete';
var SELECT = 'select';
var EDITING = 'editing';
var idIndex = 0;
var leftItem = null;

window.onload = function() {
    DATA.init(function() {
        var data = DATA.data;

        var newItem = $('.todo-input');
        newItem.value = data.message;
        newItem.addEventListener('keyup', function(event) {
            data.message = newItem.value;
            DATA.flush();
            if (event.keyCode !== 13) {
                return;
            }
            if (data.message !== '') {
                data.items.push({msg: data.message, complete: false})
                data.message = ''
                updateAll();
                return;
            }
            return;
        }, false);
    
        var checkAll = $('.toggle-all');
        checkAll.addEventListener('change', function() {
            var checked = checkAll.checked;
            /**
             * var items = $All('.items-list li');
             * items.forEach(function(item, index) {
             *     var checkInput = item.querySelector('.toggle');
             *     if (checkInput.checked !== checked) {
             *         checkInput.checked = checked;
             *         if (checkInput.checked) {
             *             item.classList.add(COMPLETE)
             *         } else {
             *             item.classList.remove(COMPLETE);
             *         }
             *     }
             * });
             */
            data.items.forEach(function(item, index) {
                item.complete = checked;
            })
            updateAll();
        }, false);
    
        var buttonList = $All('.select-button li button');
        buttonList.forEach(function(button, index) {
            if (button.id === 'clear') {
                return;
            }
            if (button.innerHTML === data.selectText) {
                button.classList.add(SELECT);
            } else {
                button.classList.remove(SELECT);
            }
            button.addEventListener('click', function() {
                for (var i = 0; i < buttonList.length; i++) {
                    if (buttonList[i].id === 'clear') {
                        continue;
                    }
                    buttonList[i].classList.remove(SELECT);
                }
                button.classList.add(SELECT);
                data.selectText = button.innerHTML;
                updateAll();
            }, false);
        });
    
        var clearButton = $('#clear');
        clearButton.addEventListener('click', function() {
            /**
             * var items = $All('.items-list li');
             * items.forEach(function(item, index) {
             *     if (item.classList.contains(COMPLETE)) {
             *         item.parentElement.removeChild(item);
             *     }
             * });
             */
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].complete) {
                    data.items.splice(i, 1);
                    i--;
                }
            }
            updateAll();
        }, false);
    
        updateAll();
    });
};

function addNewItem(message, complete, index) {
    /**
     * <li id="" class="">
     *     <div>
     *         <input class="toggle" type="checkbox">
     *         <label>{msg}</label>
     *     </div>
     *     <div style="height: 60px; display: none;"></div>
     *     <button class="edit" style="display: none;">edit</button>
     *     <button class="delete" style="display: none;">delete</button>
     * </li>
     */
    var itemList = $('.items-list');
    var itemLi = document.createElement('li');
    var itemDiv = document.createElement('div');
    var itemDiv2 = document.createElement('div');
    var itemInput = document.createElement('input');
    var itemLabel = document.createElement('label');
    var itemButton = document.createElement('button');
    var itemButton2 = document.createElement('button');

    itemButton.innerHTML = 'edit';
    itemButton.style.display = 'none';
    itemButton.classList.add('edit');
    itemButton2.innerHTML = 'delete';
    itemButton2.style.display = 'none';
    itemButton2.classList.add('delete');
    itemLabel.innerHTML = message;
    itemInput.classList.add('toggle');
    itemInput.type = 'checkbox';
    itemInput.checked = complete;
    itemDiv.appendChild(itemInput);
    itemDiv.appendChild(itemLabel);
    itemDiv2.style.height = '60px';
    itemDiv2.style.display = 'none';
    itemLi.appendChild(itemDiv);
    itemLi.appendChild(itemDiv2);
    itemLi.appendChild(itemButton);
    itemLi.appendChild(itemButton2);
    itemLi.setAttribute('id', 'item' + idIndex++);
    if (complete) {
        itemLi.classList.add(COMPLETE);
    }

    itemInput.addEventListener('change', function() {
        /**
         * var item = this.parentElement.parentElement;
         * if (this.checked) {
         *     item.classList.add(COMPLETE);
         * } else {
         *     item.classList.remove(COMPLETE);
         * }
         */
        DATA.data.items[index].complete = !DATA.data.items[index].complete;
        updateAll();
    });

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

    itemButton2.addEventListener('click', function() {
        //var item = this.parentElement;
        //item.parentElement.removeChild(item);
        DATA.data.items.splice(index, 1);
        updateAll();
    });

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

    itemList.insertBefore(itemLi, itemList.firstElementChild);
}

function updateAll() {
    DATA.flush();
    var data = DATA.data;
    var completeCont = 0;
    $('.items-list').innerHTML = '';

    data.items.forEach(function (item, index) {
        if (item.complete) {
            completeCont++;
            if (data.selectText !== 'Active') {
                addNewItem(item.msg, item.complete, index);
            }
        } else if (data.selectText !== 'Completed') {
            addNewItem(item.msg, item.complete, index);
        }
    });
/*
    var items = $All('.items-list li');
    var completeCont = 0;
    var selectButtonText = $('.select-button li button.select').innerHTML;
    items.forEach(function(item, index) {
        hiddenButton(item);
        if (item.classList.contains(COMPLETE)) {
            completeCont++;
            if (selectButtonText === 'Active') {
                item.style.display = 'none';
            } else {
                item.style.display = '';
            }
        } else {
            if (selectButtonText === 'Completed') {
                item.style.display = 'none';
            } else {
                item.style.display = '';
            }
        }
    });
*/
    $('#clear').style.visibility = completeCont > 0 ? 'visible' : 'hidden';

    var differ = data.items.length - completeCont;
    $('.items-count').innerHTML = (differ || 'No') + (differ > 1 ? ' items' : ' item') + ' left';

    var checkAll = $('.toggle-all');
    checkAll.style.display = data.items.length == 0 ? 'none' : '';
    checkAll.checked = differ == 0;

    $('.todo-input').value = data.message;
}

function hiddenButton(item) {
    item.style.left = '0px';
    item.querySelectorAll('button').forEach(function(button, index) { button.style.display = 'none'; });
}