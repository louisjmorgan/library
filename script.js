const container = document.querySelector('.container')
const form = document.querySelector('form')
const addBookBtn = document.querySelector('.add-book')

class Book {
    constructor(title, author, pages, read=false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {

    constructor() {
        form.style.display = "none";

        this.submitForm = this.submitForm.bind(this);
        this.removeBook = this.removeBook.bind(this);
        this.toggleRead = this.toggleRead.bind(this);

        addBookBtn.addEventListener('click', this.showForm, false);
        form.addEventListener('submit', this.submitForm, false);
        
        this.libArray = [];
    }


    addBooktoLibrary(book) {
        this.libArray.push(book);
        this.displayBooks()
    }

    displayBooks() {
        while (container.firstChild) container.removeChild(container.lastChild);
        let index = 0
        this.libArray.forEach(book =>  {
            let card = document.createElement('div');
            for (const [key, value] of Object.entries(book)) {
                if (key in book) {
                    card.textContent += `${key}: `
                    card.textContent += value + '\r\n'
                }
            }
            card.setAttribute('data-key', `${index}`)
            card.classList.add('book')
            index++
    
            let removeButton = document.createElement('button')
            removeButton.textContent = 'Remove'
            
            removeButton.addEventListener('click', this.removeBook, false)
            card.appendChild(removeButton)
    
            let readButton = document.createElement('button')
            readButton.textContent = "Toggle read/not read"
            readButton.addEventListener('click', this.toggleRead, false)
            card.appendChild(readButton)
    
            
            container.appendChild(card)
        })
    }

    removeBook(e) {
        let index = e.target.parentElement.attributes['data-key'].value;
        this.libArray.splice(index, 1);
        this.displayBooks();
    }

    toggleRead(e) {
        let index = e.target.parentElement.attributes['data-key'].value;
        this.libArray[index].read ? this.libArray[index].read = false : this.libArray[index].read = true;
        this.displayBooks();
    }

    showForm(e) {
        e.preventDefault()
        form.style.display ="block"
        addBookBtn.style.display="none"
    }

    submitForm(e) {
        e.preventDefault()
        const title = form.elements["title"].value;
        const author = form.elements["author"].value;
        const pages = form.elements["pages"].value;
        let read = form.elements["read"];
        if (read.checked === true) {
            read = true;
        }
        else {
            read = false;
        }
        const newBook = new Book(title, author, pages, read);
        this.addBooktoLibrary(newBook);
        this.displayBooks();
        form.style.display ="none";
        addBookBtn.style.display="block";
    }

}




const myLibrary = new Library
const imGay = new Book('Im gay', 'Gay shark', 69, false)
myLibrary.addBooktoLibrary(imGay)
