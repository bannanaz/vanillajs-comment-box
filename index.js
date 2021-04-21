
const list = document.querySelector('.displayList');
const search = document.querySelector('.search');
const empty = document.querySelector('.empty-state');
const inputName = document.getElementById('name');
const inputText = document.getElementById('message');
const nameError = document.getElementById('errorName');
const textError = document.getElementById('errorMessage');
let messageList = [];
let activeMessageID;

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
  //setActiveMessageID(messageObj.id);
  renderMessageList(messageList);
  console.log(messageList);
}

const form = document.getElementById('inputForm');
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = inputName.value;
  const text = inputText.value;

  if (inputName.validity.valueMissing || inputText.validity.valueMissing) {
    showError();
  }

  if (!inputName.validity.valueMissing || !inputText.validity.valueMissing) {
    removeError();
  }

  if (activeMessageID) {
    updateMessage(activeMessageID);
    removeMessageID();
  }

  else if (inputName.validity.valid && inputText.validity.valid) {
    addMessage(name, text);
    inputName.value = "";
    inputText.value = "";
  }
});

list.addEventListener('click', evt => {
  let clickedLI = evt.target.closest('li');
  let clickedID = clickedLI.getAttribute('data-key');

  if (evt.target.classList.contains('like')) {
    console.log(clickedID);
    toggleLike(clickedID);
    renderMessageList(messageList);
  }

  if (evt.target.classList.contains('delete')) {
    deleteComment(clickedID);
    saveMessages();
    renderMessageList(messageList);
  }
  if (evt.target.classList.contains('message')) {
    setText(readMessage(clickedID));
  }
  else if (evt.target.classList.contains('name')) {
    setText(readMessage(clickedID));
  }
});

function messageObjToHTML(messageObj) {

  const LI = document.createElement("li");
  LI.setAttribute('data-key', messageObj.id);
  LI.classList.add("renderedLi");

  let oldDate = new Date(messageObj.id);
  let displayDate = moment().from(oldDate, Boolean);

  LI.innerHTML =
    `<div>
    <div class='firstsection'>
      <p class='name'>From: ${messageObj.name}</p>
      <p class='like'>${messageObj.like ? '♥' : '♡'}</p>
    </div>  
      <p class='message'>${messageObj.text}</p>
    <div class='lastsection'> 
      <p>${displayDate} ago</p>
      <p class='delete'>🗑️</p>
    </div>
    <div>
    <hr>
  `
  return LI
}

function renderMessageList(arr) {
  list.innerHTML = '';
  arr.forEach(function (post) {
    list.prepend(messageObjToHTML(post));
  })
  toggleEmpty();
}

function getMessages() {
  let MessageStr = localStorage.getItem('allPosts');
  if (!MessageStr) {
    return;
  }
  messageList = JSON.parse(MessageStr);
  //console.log(messageList);
}

function saveMessages() {
  localStorage.setItem('allPosts', JSON.stringify(messageList))
}

function toggleLike(id) {
  let messageObj = messageList.find(key => key.id == id);
  messageObj.like = !messageObj.like;
  saveMessages();
}

function toggleEmpty() {
  if (messageList.length != 0) {
    empty.style.display = "none";
  }
}

function searchNotes(str, func = function (note) { return note.name.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) }) {
  return messageList.filter(func)
}

function showError() {
  if (inputName.validity.valueMissing) {
    nameError.style.display = "block";
  }

  if (inputText.validity.valueMissing) {
    textError.style.display = "block";
  }
}

function removeError() {
  if (!inputName.validity.valueMissing) {
    nameError.style.display = "none";
  }

  if (!inputText.validity.valueMissing) {
    textError.style.display = "none";
  }
}

function readMessage(id) {
  let newObj = messageList.find(item => item.id == id);
  return newObj;
}

function setText(item) {
  inputName.value = item.name;
  inputText.value = item.text;
  setActiveMessageID(item.id);
}

function updateMessage(id) {
  let messageObj = messageList.find(item => item.id == id);
  messageObj.name = inputName.value;
  messageObj.text = inputText.value;
  saveMessages();
  renderMessageList(messageList);
}

function setActiveMessageID(id) {
  activeMessageID = id;
}

function removeMessageID() {
  activeMessageID = !activeMessageID
  inputName.value = "";
  inputText.value = "";
}

function deleteComment(key) {
  messageList = messageList.filter(item => item.id !== Number(key));
  if (messageList.length === 0) {
    empty.style.display = "flex";
  }
  console.log(messageList);
}

