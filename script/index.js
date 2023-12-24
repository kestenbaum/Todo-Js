//const
const getSelectorTodoInput = document.querySelector('.form-todo__input')
const getSelectorTodoButton = document.querySelector('.form-todo__btn')
const getSelectorTodoList = document.querySelector('.todo-list')

//Data
let data = []

//Event Listener
getSelectorTodoButton.addEventListener('click', addNewTodo)
getSelectorTodoList.addEventListener('click', deleteBtn)
getSelectorTodoList.addEventListener('change', checkboxChange)

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
    getSelectorTodoList.innerHTML = `<div class='tittle'>Todo-List Отсутсвует</div>`
}

//Create new item
function createNewTodo (array) {
    let newTodo = {
        id: Date.now(),
        body: getSelectorTodoInput.value,
        checked: false
    }
    getSelectorTodoInput.value.length > 0 && array.push(newTodo)
}


//add new item
function addNewTodo (event) {
    event.preventDefault()
    createNewTodo(data)
    setLocalStorage(data)
    checkLocalStorage(getLocalStorage())
    getSelectorTodoInput.value = ''
}

//delete item
function deleteBtn (event) {
    event = event.target
    if (event.classList.contains('delete-btn')){
        let result = getLocalStorage().filter((item) => item.id !== getId(event))
        setLocalStorage(result)
        todoUpdate(result)
        data = getLocalStorage()
        getLocalStorage().length === 0 && todoNull()
    }
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
function todoUpdate (array) {
    let todoElement = ''
    array.map(item =>
        todoElement += `
        <div class='todo-item' id='${item.id}'>
            <div class='todo-description'>${item.body}</div>
            <div class='todo-option'>
            <input type='checkbox' class='todo-checked' ${item.checked ? 'checked' : ''}>
            <button type='button' class='delete-btn'>Delete</button>
            </div>
        </div>  
      `)
    getSelectorTodoList.innerHTML = todoElement
}

function createLocalStorage () {
    localStorage.length === 0 && setLocalStorage(data)
}

function checkLocalStorage (array) {
   if ( array.length >= 1){
       data = getLocalStorage()
       todoUpdate(array)
   } else {
       todoNull()
   }
}
createLocalStorage()
checkLocalStorage(getLocalStorage())
