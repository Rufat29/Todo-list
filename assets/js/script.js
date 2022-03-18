const todoList = document.querySelector('.tasks')
const title = document.querySelector('.title-input')
const desc = document.querySelector('.desc-input')
const dateIn = document.querySelector('.date-input')
const time = document.querySelector('.time-input')

const button = document.querySelector('.add')
const remove = document.querySelector('.remove')
const text = document.querySelector('.validation-txt')
var messages = document.querySelectorAll(".message");

const task = document.querySelector('.task')
const modal = document.querySelector('.timer')
const close = document.querySelector('.exit')

let activeDate
let activeTime
let sum
let day
let month
let year
let now
let distance

let data = []

const getDate = (date) => {
  const arr1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateArr = date.split("-");
  day = parseInt(dateArr[2]);
  month = parseInt(dateArr[1])
  year = dateArr[0]
  month = arr1[month - 1];
  return month + " " + day
}

const toggle = (id) => {
  modal.classList.remove("dis")
  modal.classList.add("active")

  const activeTodo = data.find(item => item.id === id)

  activeDate = activeTodo.date
  activeTime = activeTodo.time
  sum = activeTodo.date + " " + activeTodo.time
  sum = new Date(Date.parse(sum.replace(/-/g, "/")));
  modal.innerHTML = `
  <div class="exit" onclick="exit()">X</div>
  <p class="modal-title">Title : ${activeTodo.title}</p>
  <p class="modal-title">Description: ${activeTodo.desc}</p>
  <div id="demo"></div>`

  const timer = setInterval(function () {
    now = new Date().getTime();
    distance = sum - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML = `<span>${days} Days </span>` + `<span>${hours} Hours </span>`
      + `<span>${minutes} Minutes </span>` + `<span>${seconds} Seconds </span>`;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("demo").innerHTML = `<span>DONE</span>`;
    }
  }, 1000);
}

const exit = () => {
  modal.classList.remove('active')
  modal.classList.add('dis')
}


// CHECK
const setData = data => {
  todoList.innerHTML = ''
  data.map(item => {
    todoList.innerHTML += `<div id="${item.id}" onclick="toggle(${item.id})" class="task" draggable="true" ondragstart="drag(event)">
    <div class="date">${getDate(item.date)}</div>
    <div class="desc">${item.title}</div>
    </div>`
  })
  localStorage.setItem('data', JSON.stringify(data))
}

data = JSON.parse(localStorage.getItem('data')) || []
setData(data)

// ADD TASK
button.addEventListener('click', () => {
  let basliq = title.value
  let mezmun = desc.value
  let tarix = dateIn.value
  let saat = time.value

  // MONTH
  const validInputs = Array.from(messages).filter(message => message.value == 0);
  if (validInputs.length > 0) {
    text.style.display = "block";
  }
  else {
    data.unshift({
      id: data.length + 1,
      title: basliq,
      desc: mezmun,
      date: tarix,
      time: saat
    })

    title.value = "";
    desc.value = "";
    dateIn.value = "";
    time.value = "";
    setData(data)
  }
})

// DELETE
const deleteTodos = () => {
  data = []
  setData(data)
}
remove.addEventListener('click', () => {
  deleteTodos();
})



function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  var dragElement = ev.target.id;

}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

}



