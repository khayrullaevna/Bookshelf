function findElement(element, parent = document) {
  return document.querySelector(element);
}

const templateBooks = findElement("#template-books");
const elCards = findElement(".cards");

function renderPosts(array, parent) {
  parent.innerHTML = null;
  for (let i = 0; i < array.length; i++) {
    const newTemplate = templateBooks.content.cloneNode(true);
    const img = newTemplate.querySelector("#book-img");
    const title = newTemplate.querySelector("#book-name");
    const author = newTemplate.querySelector("#book-description");
    const year = newTemplate.querySelector("#book-year");
    const button1 = newTemplate.querySelector("#bookmark");
    const button2 = newTemplate.querySelector("#more-info");

    if (img) {
      img.src = array[i].volumeInfo.imageLinks.smallThumbnail;
    }
    if (title) {
      title.textContent = array[i].volumeInfo.title;
    }
    if (author) {
      author.textContent = array[i].volumeInfo.authors;
    }
    if (year) {
      year.textContent = array[i].volumeInfo.publishedDate;
    }
    if (button1) {
      button1.setAttribute("data-id", array[i].id);
    }
    if (button2) {
      button2.setAttribute("data-id", array[i].id);
    }
    parent.appendChild(newTemplate);
  }
}















// const newCard = document.createElement("div");
// newCard.className = "card mb-5";
// newCard.innerHTML = `
// <div>
//     <img id="book-img" class="card-img-top" style="margin: 30px 40px" src="${books[0].items[i].volumeInfo.imageLinks.smallThumbnail}" alt="Card-image-cap">
//     <div class="card-body">
//         <h5 id="book-name" class="card-title"><b>${books[0].items[i].volumeInfo.title}</b></h5>
//         <p id="book-description" class="card-text">${books[0].items[i].volumeInfo.authors.join()}</p>
//         <p id="book-year" class="card-text">${books[0].items[i].volumeInfo.publishedDate}</p>
//     </div>
//     <div class="card-body card-btn">
//         <button id="bookmark" data-id="${items[i].id}" class="btn" data-toggle="modal" data-target="#exampleModal">Bookmark</button>
//         <button id="more-info" data-id="${items[i].id}" class="btn">More Info</button>
//     </div>
//     <div class="card-body read">
//         <button id="read-btn" data-id="${items[i].id}" class="btn ml-4 card-btn">Read</button>
//     </div>
// </div>
// `;
// parent.appendChild(newCard);
