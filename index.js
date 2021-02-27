
const list = document.querySelector('.displayList');
const search = document.querySelector('.search');
const inputName = document.getElementById('name');
const inputText = document.getElementById('message');
let messageList = [];

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {

  search.addEventListener('input', function (evt) {
    evt.preventDefault();
    let searchStr = evt.target.value;
    console.log(searchStr);
    if (searchStr.length >= 1) {
      let foundNotes = searchNotes(searchStr);
      renderMessageList(foundNotes);
    } else {
      renderMessageList(messageList)
    }
  })

  getMessages();
  renderMessageList(messageList);
}

function addMessage(name, text) {
  const messageObj = {
    name,
    text,
    like: false,
    id: Date.now(),
  };

  messageList.push(messageObj);
  saveMessages();
  setActiveMessageID(messageObj.id);
  renderMessageList(messageList);
  console.log(messageList);
}

const form = document.getElementById('inputForm');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const name = inputName.value;
  const text = inputText.value;

  if (name || text !== '') {
    addMessage(name, text);
    inputName.value = "";
    inputText.value = "";
  }
});

list.addEventListener('click', evt => {
  if (evt.target.classList.contains('like')) {
    const id = evt.target.parentElement.parentElement.dataset.key;
    console.log(id);
    toggleLike(id);
    renderMessageList(messageList);
  }

  if (evt.target.classList.contains('delete')) {
    const id = evt.target.parentElement.parentElement.dataset.key;
    deleteComment(id);
    saveMessages();
    renderMessageList(messageList);

  }
});

function messageObjToHTML(messageObj) {
  //const item = document.querySelector(`[data-key='${messageObj.id}']`);

  const LI = document.createElement("li");
  LI.setAttribute('data-key', messageObj.id);
  LI.classList.add("renderedLi");

  let oldDate = new Date(messageObj.id);
  let displayDate = moment().from(oldDate, Boolean);

  LI.innerHTML =
    `<div class='firstsection'>
      <p>From: ${messageObj.name}</p>
      <p class='like'>${messageObj.like ? '♥' : '♡'}</p>
    </div>  
      <p>${messageObj.text}</p>
    <div class='lastsection'>  
      <p>${displayDate} ago</p>
      <p class='delete'>🗑️</p>
    </div>
    <hr>
  `
  return LI
}

function renderMessageList(arr) {
  list.innerHTML = '';
  arr.forEach(function (post) {
    list.prepend(messageObjToHTML(post));
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

function toggleLike(id) {
  let messageObj = messageList.find(key => key.id == id);
  messageObj.like = !messageObj.like;
  saveMessages();
}

function setActiveMessageID(id) {
  activeMessageID = id;
}

function searchNotes(str, func = function (note) { return note.name.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) }) {
  return messageList.filter(func)
}

function deleteComment(key) {
  messageList = messageList.filter(item => item.id !== Number(key));
  console.log(messageList);
}

