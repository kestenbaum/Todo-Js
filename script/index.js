//Selectors
const todoInput = document.querySelector('.form-todo__input'),
      todoButton = document.querySelector('.form-todo__btn'),
      todoList = document.querySelector('.todo-list')

//Data
let data = []

//Event Listener
todoButton.addEventListener('click', addNewTodo)
todoList.addEventListener('click', deleteBtn)
todoList.addEventListener('change', checkboxChange)


//Functions
function setLocalStorage (massive) {
    localStorage.setItem('key', JSON.stringify(massive))
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('key'))
}

function getId (element) {
    return Number(element.parentNode.parentNode.getAttribute('id'))
}

function todoNull () {
    todoList.innerHTML = `<div class='tittle'>Todo-List Отсутсвует</div>`
}


//Create new item
function createNewTodo (massive) {
    let newTodo = {
        id: Date.now(),
        body: todoInput.value,
        checked: false
    }
    todoInput.value.length > 0
        ? massive.push(newTodo)
        : null
}


//add new item
function addNewTodo (event) {
    event.preventDefault()
    createNewTodo(data)
    setLocalStorage(data)
    checkLocalStorage(getLocalStorage())
    todoInput.value = ''
}

//delete item
function deleteBtn (event) {
    event = event.target
    if (event.classList.contains('delete-btn')){
        let result = getLocalStorage().filter((item) => item.id !== getId(event))
        setLocalStorage(result)
        todoUpdate(result)
        data = getLocalStorage()
        getLocalStorage().length === 0
            ? todoNull()
            : null
    }
    console.log(data)
}
//change checkbox
function checkboxChange (event) {
    event = event.target
    let changeLocal = getLocalStorage()
    changeLocal.forEach(item => {
        if (item.id === getId(event)){
            item.checked = !item.checked
        }
    })
    setLocalStorage(changeLocal)
}

//update display
function todoUpdate (massive) {
    todoStr = ''
    massive.map(item =>
      todoStr += `
        <div class='todo-item' id='${item.id}'>
            <div class='todo-description'>${item.body}</div>
            <div class='todo-option'>
            <input type='checkbox' class='todo-checked' ${item.checked ? 'checked' : ''}>
            <button type='button' class='delete-btn'>Delete</button>
            </div>
        </div>  
      `)

    todoList.innerHTML = todoStr
}

function createLocalStorage () {
    localStorage.length === 0 ? setLocalStorage(data) : null
}

function checkLocalStorage (massive) {
   if ( massive.length >= 1){
       data = getLocalStorage()
       todoUpdate(massive)
   } else {
       todoNull()
   }
}
createLocalStorage()
checkLocalStorage(getLocalStorage())
