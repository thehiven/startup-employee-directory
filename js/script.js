'use strict';

let users = [];
let modalContainer = null;
const gallery = document.getElementById('gallery');

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(json => json.results)
  .then(array => {
    users = array;
    createAndAppendUsers(users)
  });

createModal();

function createElementWithClass(tag, className) {
  const newElement = document.createElement(tag);
  newElement.className = className;
  return newElement;
}

function createModal() {
  modalContainer = createElementWithClass('div', 'modal-container');
  const modal = createElementWithClass('div', 'modal');

  const closeButton = createElementWithClass('button', 'modal-close-btn');
  closeButton.type = 'button';
  closeButton.id = 'modal-close-btn';
  closeButton.innerHTML = '<strong>X</strong>';
  closeButton.addEventListener('click', () => modalContainer.style.display = 'none');
  modal.append(closeButton);

  const infoContainer = createElementWithClass('div', 'modal-info-container');

  const img = createElementWithClass('img', 'modal-img');
  img.alt = 'profile picture';
  const name = createElementWithClass('h3', 'modal-name cap');
  const email = createElementWithClass('p', 'modal-text email');
  const location = createElementWithClass('p', 'modal-text cap location');
  const devider = document.createElement('hr');
  const cel = createElementWithClass('p', 'modal-text cel');
  const address = createElementWithClass('p', 'modal-text address');
  const bday = createElementWithClass('p', 'modal-text bday');

  infoContainer.append(img);
  infoContainer.append(name);
  infoContainer.append(email);
  infoContainer.append(location);
  infoContainer.append(devider);
  infoContainer.append(cel);
  infoContainer.append(address);
  infoContainer.append(bday);
  
  modal.append(infoContainer);
  modalContainer.append(modal);
  modalContainer.style.display = 'none'

  document.body.append(modalContainer);
}

function showModal(userID) {
  const modal = document.querySelector('div.modal-info-container');
  modal.querySelector('img').src = users[userID].picture.large;
  modal.querySelector('h3').textContent = `${users[userID].name.title}. 
                                            ${users[userID].name.first} ${users[userID].name.last}`;
  modal.querySelector('p.email').textContent = users[userID].email;
  modal.querySelector('p.location').textContent = users[userID].location.city;
  modal.querySelector('p.cel').textContent = users[userID].cell;
  modal.querySelector('p.address').textContent = `${users[userID].location.street}, 
                                                    ${users[userID].location.city}, ${users[userID].location.state}, 
                                                    ${users[userID].location.postcode}`;
  modal.querySelector('p.bday').textContent = users[userID].dob.date.match(/\d{4}-\d{2}-\d{2}/);
  modal.parentElement.parentElement.style.display = '';
}

function createAndAppendUsers(users) {
  users.forEach((user, index) => {
    const card = createElementWithClass('div', 'card');
    card.id = index;

    const imageContainer = createElementWithClass('div', 'card-img-container');
    const infoContainer = createElementWithClass('div', 'card-info-container');
  
    const image = createElementWithClass('img', 'card-img');
    image.src = user.picture.large;
    image.alt = 'profile picture';
    imageContainer.append(image);
  
    const name = createElementWithClass('h3', 'card-name cap');
    const email = createElementWithClass('p', 'card-text');
    const location = createElementWithClass('p', 'card-text cap');
  
    name.textContent = `${user.name.first} ${user.name.last}`;
    email.textContent = user.email;
    location.textContent = `${user.location.city}, ${user.location.state}`;
  
    infoContainer.append(name);
    infoContainer.append(email);
    infoContainer.append(location);
  
    card.append(imageContainer);
    card.append(infoContainer);

    addEventListenerToCard(card);

    gallery.append(card);
  });
}

function addEventListenerToCard(card) {
  card.addEventListener('click', function() {
    showModal(this.id);
  });
}