let books = [];
const elCards = document.querySelector(".cards");
const bookmarks = document.querySelector(".bookmarks");
const modalContent = document.querySelector(".modal-content");
const searchInput = document.querySelector("#search");

const elLoginBtn = document.querySelector("#login-btn");
const header = document.querySelector("header");



let isLogin = localStorage.getItem("login") === 'true' ? true : false;

if (isLogin) {
    elLoginBtn.textContent = "Logout";
    const newLink = document.createElement("a");
    newLink.href = "../login/login.html";
    newLink.textContent = "Login";
    header.appendChild(newLink);
}
elLoginBtn.addEventListener("click", (evt)=>{
    if(!isLogin){
      newLink.href = "../login/login.html";
      newLink.textContent = "Logout"
      header.appendChild(newLink)
    }else{
      elLoginBtn.textContent = "Login";
      header.innerHTML = null;
      header.appendChild(elLoginBtn);
      isLogin = false;
      localStorage.setItem("login", false)
    }
})

fetch('https://www.googleapis.com/books/v1/volumes?q=test')
.then(response => response.json())
.then((res) => {
    books = res.items;
    renderPosts(books, elCards);

})
.catch(err => alert(err))

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value;
  if (!searchValue) {
    elCards.innerHTML = '';
    return;
  }
  fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}`)
    .then((res) => res.json())
    .then((res) => {
      renderPosts(res.items, elCards);
    })
    .catch((error) => {
      console.log(error);
    });
});


function selectBooks(array, parent, evt){
  array.forEach(element => {
    if(element.id === evt.dataset.id){
      const selectedBokmarks = document.createElement("div");
      selectedBokmarks.innerHTML = `
      <div class="marked">
        <div class="marked-info">
          <h3 class="marked-title">${element.volumeInfo.title}</h3>
          <p class="marked-text">${element.volumeInfo.authors}</p>
        </div>
        <div class="marked-signs">
          <img data-id="${element.id}" id="read-icon" class="read" src="../img/book-open.png" alt="read" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <img data-id="${element.id}" id="delete-icon" class="delete" src="../img/delete.png" alt="delete">
        </div>
      </div>
      `
      parent.appendChild(selectedBokmarks);
    }
  });
}

elCards.addEventListener("click", (evt)=>{
  const arr = [];
  if (evt.target.id === 'bookmark'){

    selectBooks(books, bookmarks, evt.target);
  }

})

bookmarks.addEventListener("click", function(evt) {
  if (evt.target.className === 'delete') {
    const bookmarkElement = evt.target.closest('.marked'); 
    if (bookmarkElement) {
      bookmarkElement.remove(); 
      const bookmarkId = evt.target.dataset.id;
      books = books.filter(element => element.id !== bookmarkId);
      console.log(books);
    }
  }
});

elCards.addEventListener("click", (evt)=>{
  if (evt.target.id === 'more-info'){
    books.forEach(element => {
      console.log(evt.target.dataset.id);
      if(element.id === evt.target.dataset.id){
        const newModal = document.createElement("div");
        newModal.innerHTML = `
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">${element.volumeInfo.title}</h1>
        </div>
        <div class="modal-body">
          <img class="modal-img" src="${element.volumeInfo.imageLinks.smallThumbnail}" alt="img">
          <p class="modal-text">Culpa nulla pariatur cupidatat nisi incididunt ea do ipsum. Incididunt quis mollit elit commodo cillum eiusmod reprehenderit labore irure. Cillum et incididunt et nostrud exercitation quis aute laboris non ut adipisicing. Laboris ad minim aute nulla proident deserunt velit anim sunt aliquip ut sit. Exercitation aliquip ullamco officia non aliqua. Sint deserunt aliquip veniam id eiusmod sit consectetur mollit ea aliqua officia consequat. Magna non mollit nisi est commodo voluptate aute id. Deserunt nostrud id do in nisi mollit deserunt non. Pariatur fugiat cillum irure elit sint nisi ad ipsum culpa deserunt cupidatat esse consequat laboris. Id aliquip non consectetur esse proident duis Lorem.</p>
        </div>
        <div class="modal-info">
          <p class="modal-extra">Author: ${element.volumeInfo.authors}</p>
          <p class="modal-extra">Published: ${element.volumeInfo.publishedDate}</p>
          <p class="modal-extra">Publishers: ${element.volumeInfo.publisher}</p>
          <p class="modal-extra">Categories: ${element.volumeInfo.categories}</p>
          <p class="modal-extra">Pages Count: ${element.volumeInfo.pageCount}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Read</button>
        </div>
        `
        modalContent.append(newModal);
      }
    });
  }
})

elCards.addEventListener("click", (evt) => {
  if (evt.target.id === 'more-info') {
    const bookId = evt.target.dataset.id;
    const book = books.find((element) => element.id === bookId);
    books.forEach(element => {
      console.log(evt.target.dataset.id);
      if(element.id === evt.target.dataset.id){
        if (book) {
          const newModal = document.createElement("div");
          newModal.innerHTML = `
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">${element.volumeInfo.title}</h1>
        </div>
        <div class="modal-body">
          <img class="modal-img" src="${element.volumeInfo.imageLinks.smallThumbnail}" alt="img">
          <p class="modal-text">Culpa nulla pariatur cupidatat nisi incididunt ea do ipsum. Incididunt quis mollit elit commodo cillum eiusmod reprehenderit labore irure. Cillum et incididunt et nostrud exercitation quis aute laboris non ut adipisicing. Laboris ad minim aute nulla proident deserunt velit anim sunt aliquip ut sit. Exercitation aliquip ullamco officia non aliqua. Sint deserunt aliquip veniam id eiusmod sit consectetur mollit ea aliqua officia consequat. Magna non mollit nisi est commodo voluptate aute id. Deserunt nostrud id do in nisi mollit deserunt non. Pariatur fugiat cillum irure elit sint nisi ad ipsum culpa deserunt cupidatat esse consequat laboris. Id aliquip non consectetur esse proident duis Lorem.</p>
        </div>
        <div class="modal-info">
          <p class="modal-extra">Author: ${element.volumeInfo.authors}</p>
          <p class="modal-extra">Published: ${element.volumeInfo.publishedDate}</p>
          <p class="modal-extra">Publishers: ${element.volumeInfo.publisher}</p>
          <p class="modal-extra">Categories: ${element.volumeInfo.categories}</p>
          <p class="modal-extra">Pages Count: ${element.volumeInfo.pageCount}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Read</button>
        </div>
        `
        modalContent.innerHTML = '';
        modalContent.appendChild(newModal);
        }
      }
    });
  }
});



