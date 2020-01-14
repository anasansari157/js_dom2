//ADD BOOK
let form = document.querySelector("#add-book");
let ul = document.querySelector("ul");
form.addEventListener("click", addBook);
var li = document.createElement('li');
ul.addEventListener("click", deleteBook);

let state =  JSON.parse(localStorage.getItem("bookStore")) || [];

function addBook(event) {
    console.log(event.target.tagName);
    if(event.target.tagName == "BUTTON") {
        let book = {};
        book.name = event.target.previousElementSibling.value;
        book.id = Date.now();
        
        state.push(book);
        localStorage.setItem("bookStore", JSON.stringify(state));
        // console.log("Hello");
        createView(state);
        
    }
   
    if(event.target.type == "checkbox") {
        if(event.target.checked == true) {
            ul.style.display = "none";
        }
        else {
            ul.style.display = "block";
        }
    }
}

function createView(state) {
    ul.innerHTML = "";
    state.forEach(element => {
        let li = document.createElement("li");
        li.textContent = element.name;
        let bookButton = document.createElement("button");
        bookButton.textContent = "DELETE";
        bookButton.classList.add("delete");
        
        li.dataset.id = element.id;
        li.appendChild(bookButton);
        ul.append(li);
        console.log("HEllo");
        
    });
}

function deleteBook(event) {
    if(event.target.tagName == "BUTTON") {
        
        state = state.filter(element => element.id != event.target.parentElement.dataset.id);
        console.log(state);
        createView(state);
        localStorage.clear();
        localStorage.setItem('bookStore', JSON.stringify(state));
        
    } 
}

createView(state);


// function hideAll() {
//     if(document.querySelector("#hide").checked == true ) {
        
//     }
// }


//Search

document.querySelector("#search-books").addEventListener("keyup", search);

function search() {
    let seacrhState = state.filter(element => element.name.toLowerCase().includes(event.target.value.toLowerCase()));
    createView(seacrhState);
}
