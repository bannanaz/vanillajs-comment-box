
const list = document.querySelector('.displayList');

const inputName = document.getElementById('name');
const inputText = document.getElementById('message');
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
    const itemKey = evt.target.parentElement.dataset.key;
    toggleLike(itemKey);
    renderMessageList(messageList);
  }

  if (evt.target.classList.contains('delete')) {
    const itemKey = evt.target.parentElement.dataset.key;
    deleteComment(itemKey);
  }
});

function messageObjToHTML(messageObj) {
  const item = document.querySelector(`[data-key='${messageObj.id}']`);

  const LI = document.createElement("li");
  LI.setAttribute('data-key', messageObj.id);
  LI.classList.add("renderedLi");

  let oldDate = new Date(messageObj.id);
  let displayDate = moment().from(oldDate, Boolean);

  LI.innerHTML =
    `<p class='like'>${messageObj.like ? '♥' : '♡'}</p>
    <p>${messageObj.name}</p>
    <p>${messageObj.text}</p>
    <div>
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

function deleteComment(id) {
  console.log('deleted!');
}
