//functions for display
const showRegister = () => {
    document.querySelector("#register").style.display = "grid";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#home").style.display = "none";
    document.querySelector("#cart").style.display = "none";
}

const showLogin = () => {
    document.querySelector("#register").style.display = "none";
    document.querySelector("#login").style.display = "grid";
    document.querySelector("#home").style.display = "none";
    document.querySelector("#cart").style.display = "none";
}

const showHome = () => {
    document.querySelector("#register").style.display = "none";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#home").style.display = "grid";
    document.querySelector("#cart").style.display = "none";
}

const showCart = () => {
    document.querySelector("#register").style.display = "none";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#home").style.display = "none";
    document.querySelector("#cart").style.display = "grid";
}

//function to register
const registerUser = () => {
    let fullname = document.querySelector("#fullname").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let pwd = document.querySelector("#pwd").value;
    let pwd2 = document.querySelector("#pwd2").value;

    if (app.registerUser(fullname, email, phone, pwd, pwd2)) {
        showLogin();
    }
}

//function to login user
const loginUser = () => {
    let uid = document.querySelector("#uid").value;
    let pwd = document.querySelector("#pwd3").value;

    if (app.loginUser(uid, pwd)) {
        displayUser();
        displayBooks();
        showHome();
    }
}

//function to display user
const displayUser = () => {
    let userTag = document.querySelector("#user_info");
    userTag.innerHTML = app.user.getUser();
}

//function to display books
const displayBooks = () => {
    let book_shelf = document.querySelector("#book_shelf");
    let text = "";
    for (let i = 0; i < app.selectedBooks.length; i++) {
        text += app.selectedBooks[i].getBookForBookShelf();
    }

    if (text === "") {
        text = "No books found!";
    }

    book_shelf.innerHTML = text;
}

//function to update modal
const showModal = book_name => {
    let book;

    for (let i = 0; i< app.books.length; i++) {
        if (book_name === app.books[i].book_name) {
            book = app.books[i];
            break;
        }
    }

    let modal_content = document.querySelector("#modal_content");
    let modal = document.querySelector("#modal");
    modal_content.innerHTML = book.getBookForModal();
    modal.style.display = "grid";
}

//close modal
const closeModal = () => {
    let modal = document.querySelector("#modal");
    modal.style.display = "none";
}

//logout user
const logoutUser = () => {
    showLogin();
}

//add item to cart
const addItemToCart = book_name => {
    app.cart.addItem(new CartItem(book_name));
    updateCart();
    closeModal();
}

//display cart
const updateCart = () => {
    let cart_content = document.querySelector("#cart_content");
    let text = "";
    for (let i = 0; i < app.cart.items.length; i++) {
        text += app.cart.items[i].getCartItem(app.books);
    }

    cart_content.innerHTML = text;

    let cart_quantity = document.querySelector("#cart_quantity");
    cart_quantity.innerHTML = app.cart.items.length;

}

//function to increment
const increment = (book_name) => {
    for (let i =0 ; i < app.cart.items.length; i++) {
        if (book_name === app.cart.items[i].book_name) {
            app.cart.items[i].increment();
        }
    }
    updateCart();
}

//function to decrement
const decrement = (book_name) => {
    for (let i =0 ; i < app.cart.items.length; i++) {
        if (book_name === app.cart.items[i].book_name) {
            app.cart.items[i].decrement();
        }
    }
    updateCart();
}

//function to delete cart item
const deleteCartItem = book_name => {
    let index;
    for (let i = 0; i < app.cart.items.length; i++) {
        if (book_name === app.cart.items[i].book_name) {
            console.log(i);
            app.cart.items.splice(index, 1);
            break;
        }
    }

    
    updateCart();
}
///the program starts here

let app = new BookStoreApp();
showRegister();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
