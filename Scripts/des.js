//class for user
class User {
    constructor(fullname, email, phone, pwd) {
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.pwd = pwd;
    }

    getUser = () => {
        let text = "";
        text += "<h2>Welcome</h2>";
        text += "<h1>" + this.fullname + "</h1>";
        text += "<h1>" + this.email + "</h1>";
        text += "<h1>" + this.phone + "</h1>";
        text += "<input type='button' value='Cart' onclick='showCart();' />";
        text += "<p class='cart_quantity' id='cart_quantity'>0</p>";
        text += "<input type='button' value='Logout' onclick='logoutUser();' />";

        return text;
    }
}

//class for book
class Book {
    constructor(book_name, author, price, ISBN, description, image) {
        this.book_name = book_name;
        this.author = author;
        this.price = price;
        this.ISBN = ISBN;
        this.description = description;
        this.image = image;
    }

    getBookForBookShelf = () => {
        let text = "";
        text += "<div class='book' onclick='showModal(\"" + this.book_name + "\")'>";
        text += "<h1>" + this.book_name + "</h1>";
        text += "<h2> -by " + this.author + "</h2>";
        text += "<img src='" + this.image + "' />";
        text += "</div>";

        return text;
    }

    getBookForModal = () => {
        let text = "";
        text += '<img src="' + this.image + '" alt="">';
        text += '<h1>' + this.book_name + '</h1>';
        text += '<h2>' + this.author + '</h2>';
        text += '<h3>' + this.price + '</h3>';
        text += '<h2>' + this.ISBN +'</h2>';
        text += '<p>' + this.description + '</p>';
        text += '<input type="button" value="Add to cart" onclick="addItemToCart(\'' + this.book_name + '\');" />';

        return text;
    }
}

//class for cart
class CartItem {
    constructor(book_name) {
        this.book_name = book_name;
        this.quantity = 1;
    }

    increment = () => {
        this.quantity += 1;
    }

    decrement = () => {
        this.quantity -= 1;
        if (this.quantity < 1) this.quantity = 1;

    }

    getCartItem = (books) => {
        let flag = false;
        let book;

        for (let i =0 ; i < books.length; i++) {
            if (this.book_name === books[i].book_name) {
                flag = true;
                book = books[i];
                break;
            }
        }

        let text = "";
        text += '<div class="cart_item">';
        text += '<div class="cart_item_image" style="background: url(\'' + book.image + '\')"></div>';
        text += '<div class="cart_info">';
        text += '<h1>' + book.book_name + '</h1>';
        text += '<h2>' + book.price.toLocaleString('en-ZA', {style:'currency', currency:'ZAR'}) + '</h2>';
        text += '<h3>' + this.quantity + '</h3>';
        text += '</div>';
        text += '<div class="cart_buttons">';
        text += '<input type="button" value="+" onclick="increment(\'' + book.book_name + '\');"  />';
        text += '<input type="button" value="-" onclick="decrement(\'' + book.book_name + '\');" />';
        text += '<input type="button" value="Remove" onclick="deleteCartItem(\'' + book.book_name + '\');" />';
        text += '</div>';
        text += '</div>';

        return text; 
    }
}

//class for Cart
class Cart {
    constructor() {
        this.items = [];
    }

    addItem = cartItem => {
        let flag = false;

        for (let i =0; i < this.items.length; i++) {
            if (cartItem.book_name === this.items[i].book_name) {
                flag = true;
                break;
            }
        }

        if(!flag) {
            this.items.push(cartItem);
        }
    }
}

//class for the entire app
class BookStoreApp {
    constructor() {
        this.user;
        this.users = [];
        this.books = [];
        this.selectedBooks = [];
        this.cart = new Cart();
        this.createBooks();
        this.selectAllBooks();
    }

    registerUser = (fullname, email, phone, pwd, pwd2) => {

        let isSuccess = false;
        //check if inputs are empty
        if (fullname === "" || email === "" || phone === "" || pwd === "" || pwd2 === "") {
            //inputs are empty
            alert("Please fill in all required information");
        } else {
            //check if user is already registered
            let flag = false;

            for (let i = 0; i < this.users.length; i++) {
                if(email === this.users[i].email || phone === this.users[i].phone) {
                    flag = true;
                    break;
                }
            }

            if (flag) {
                //user  already exist
                alert(fullname + " already registered using the information you used!");
            } else {
                //check if password match
                if (pwd === pwd2) {
                    //good
                    let newUser = new User(fullname, email, phone, pwd);
                    this.users.push(newUser);
                    isSuccess = true;
                    alert(fullname + " successfully registered to our system");
                } else {
                    //password does not match
                    alert("Passwords does not match, please make sure you dont forget your password!");
                }
            }
        }

        return isSuccess;
    }

    loginUser = (uid, pwd) => {
        let isSuccess = false;
        //check if inputs are empty
        if (uid === "" || pwd === "") {
            //inputs are empty
            alert("Please fill in the required information before you can login");
        } else {
            //check if the user is registered
            let flag = false;
            for (let i = 0; i < this.users.length; i++) {
                if (uid === this.users[i].email || uid === this.users[i].phone) {
                    flag = true;
                    this.user = this.users[i];
                    break;
                }
            }

            if (flag) {
                //check if password match
                if (pwd === this.user.pwd) {
                    //user logged in
                    isSuccess = true;
                } else {
                    alert("Password does not match");
                }
            } else {
                //user not registered
                alert(uid + " not registered, please register with us");
            }
        }

        return isSuccess;
    }

    createBooks = () => {
        this.books.push(new Book("The man burned by winter", "Pete Zacharias", 150, "1542039657", "Still reeling from a personal tragedy, investigative journalist Rooker Lindstrom finds a grim hideaway from the world. Its the dilapidated cabin on Minnesotas Deer Lake bequeathed to him by his late father—one of the most notorious serial killers in the state. If the walls of this murder house could talk, theyd scream.", "./Images/Books/man.jpg"));
        this.books.push(new Book("Reminders of him", "Colleen Hoover", 200, "1542025605", "blah blah blah blah", "./Images/Books/reminder.jpg"));
    }

    selectAllBooks = () => {
        this.selectedBooks = [];
        for (let i = 0; i < this.books.length; i++) {
            this.selectedBooks.push(this.books[i]);
        }
    }

    selectBookByName = book_name => {
        this.selectedBooks = [];
        for(let i = 0; i < this.books.length; i++) {
            if (book_name === this.books[i].book_name) {
                this.selectedBooks.push(this.books[i]);
            }
        }
    }
}