const form = document.getElementById("newItem");
const list = document.getElementById("list");
//Pega a lista de filmes do localStorage caso exista
//se não existir cria uma lista vazia
const items = JSON.parse(localStorage.getItem("items")) || [];
var lastItem = 0;

//Percorre a lista e add os elementos do localStorage na tela
items.forEach( (element) => {
    const liMovie = document.createElement("li");
    liMovie.classList.add("item");
    liMovie.dataset.aos = "fade-up";
    liMovie.dataset.id = lastItem;
    addElement(element, liMovie, false);
    lastItem++;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = event.target.elements['name'];
    const sumary = event.target.elements['sumary'];
    const grade = event.target.elements['grade'];
    const date = event.target.elements['date'];

    const newItem = {
        "id": lastItem,
        "name": name.value,
        "sumary": sumary.value,
        "grade": grade.value,
        "date": date.value
    }

    //Add o item novo na tela
    const liMovie = document.createElement("li");
    liMovie.classList.add("item");
    liMovie.dataset.id = lastItem;
    liMovie.dataset.aos = "fade-up";
    addElement(newItem, liMovie, false);
    //Add o item novo no array que vai pro localStorage
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    name.value = "";
    sumary.value = "";
    grade.value = "";
    date.value = "";

    lastItem++;
    openModal();
});

function addElement(item, liMovie, existe) {

    const nameMovie = document.createElement("h2");
    nameMovie.innerHTML = item.name;

    const sumaryMovie = document.createElement("p");
    sumaryMovie.innerHTML = item.sumary;

    const gradeMovie = document.createElement("p");
    gradeMovie.innerHTML = 'nota: ' + item.grade;

    const dateMovie = document.createElement("p");
    dateMovie.innerHTML = 'data de lançamento: ' + item.date;

    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
    buttonDelete.addEventListener("click", function() {
        deleteElement(this.parentNode, item.id)
    });

    const buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = '<i class="far fa-edit"></i>';
    buttonEdit.addEventListener("click", function() {
        openEdit(item)
    });

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(buttonDelete);
    buttons.appendChild(buttonEdit);


    liMovie.appendChild(nameMovie);
    liMovie.appendChild(sumaryMovie);
    liMovie.appendChild(gradeMovie);
    liMovie.appendChild(dateMovie);
    liMovie.appendChild(buttons);

    if(!existe) {
        list.appendChild(liMovie)
    }
}

function deleteElement(movieDeleted, id) {

    movieDeleted.parentNode.remove();
    items.splice(items.findIndex(element => element.id === id), 1);
    localStorage.setItem("items", JSON.stringify(items))
}

function openEdit(item) {

    const movie = document.querySelector("[data-id='"+item.id+"']");

    movie.innerHTML = '';

    const newForm = document.createElement("form");
    newForm.id = "formEdit";

    const labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.innerHTML = "Nome";
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "name");
    inputName.setAttribute("value", item.name);
    inputName.setAttribute("required", true);

    const labelSumary = document.createElement("label");
    labelSumary.setAttribute("for", "sumary");
    labelSumary.innerHTML = "Resumo";
    const inputSumary = document.createElement("textarea");
    inputSumary.setAttribute("name", "sumary");
    inputSumary.setAttribute("rows", "4");
    inputSumary.setAttribute("cols", "50");
    inputSumary.innerHTML = item.sumary;

    const labelGrade = document.createElement("label");
    labelGrade.setAttribute("for", "grade");
    labelGrade.innerHTML = "Nota";
    const inputGrade = document.createElement("input");
    inputGrade.setAttribute("type", "number");
    inputGrade.setAttribute("name", "grade");
    inputGrade.setAttribute("value", item.grade);
    inputGrade.setAttribute("min", "0");
    inputGrade.setAttribute("max", "10");

    const labelDate = document.createElement("label");
    labelDate.setAttribute("for", "date");
    labelDate.innerHTML = "Data de lançamento";
    const inputDate = document.createElement("input");
    inputDate.setAttribute("type", "date");
    inputDate.setAttribute("name", "date");
    inputDate.setAttribute("value", item.date);
    inputDate.setAttribute("max", currentDate);

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "register");
    submitButton.setAttribute("value", "Editar");

    newForm.appendChild(labelName);
    newForm.appendChild(inputName);
    newForm.appendChild(labelSumary);
    newForm.appendChild(inputSumary);
    newForm.appendChild(labelGrade);
    newForm.appendChild(inputGrade);
    newForm.appendChild(labelDate);
    newForm.appendChild(inputDate);
    newForm.appendChild(submitButton);

    movie.appendChild(newForm);

    newForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = event.target.elements['name'];
        const sumary = event.target.elements['sumary'];
        const grade = event.target.elements['grade'];
        const date = event.target.elements['date'];

        const newItem = {
            "id": item.id,
            "name": name.value,
            "sumary": sumary.value,
            "grade": grade.value,
            "date": date.value
        }

        movie.innerHTML = '';
        movie.dataset.aos = "fade-up";
        addElement(newItem, movie, true);

        items[items.findIndex(elemento => elemento.id === item.id)] = newItem;
        localStorage.setItem("items", JSON.stringify(items))
    });
    
}

