
const list = document.querySelector('.displayList');
let messageList = [];

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  getMessages();
  renderMessageList(messageList);
}

function addMessage(name, text) {
  const messageObj = {
    name,
    text,
    id: Date.now(),
  };

  messageList.push(messageObj);
  saveMessages();
  renderMessageList(messageList);
  console.log(messageList);
}

const form = document.getElementById('inputForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const inputName = document.getElementById('name');
  const inputText = document.getElementById('message');

  const name = inputName.value;
  const text = inputText.value;

  if (name || text !== '') {
    addMessage(name, text);
  }
});

function messageObjToHTML(messageObj) {
  // givet ett noteObj IN, returnera HTML
  let LI = document.createElement('li');
  LI.classList.add("renderedLi");

  LI.innerHTML =
    `<p>${messageObj.name}</p>
    <p>${messageObj.text}</p>
    <p>${messageObj.id}</p>
  `
  return LI
}

function renderMessageList(arr) {
  list.innerHTML = '';
  arr.forEach(function (note) {
    list.appendChild(messageObjToHTML(note));
  })
}

function getMessages() {
  let MessageStr = localStorage.getItem('allPosts');
  if (!MessageStr) {
    return;
  }
  messageList = JSON.parse(MessageStr);
  console.log(messageList);
}

function saveMessages() {
  localStorage.setItem('allPosts', JSON.stringify(messageList))
}



/*
// loop array
for (var i in allPosts) {
  let pastTimestamp = new Date(allPosts[i].timestamp);
  let nowTimestamp = new Date();
  let result = differenceInDays(nowTimestamp, pastTimestamp);

  if (result == 0) {
    document.getElementById("display").innerHTML += "<br>" + (allPosts[i].name + "<br>" + allPosts[i].message + "<br>" + "Idag" + "<br>" + "<br>");
  }

  else {
    document.getElementById("display").innerHTML += "<br>" + (allPosts[i].name + "<br>" + allPosts[i].message + "<br>" + result + " dagar sedan" + "<br>" + "<br>");
  }
}
*/