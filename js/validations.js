//Validação da data dos filmes
const formInputDate = document.getElementById("date");

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const today = date.getDate();
const currentDate = currentYear + '-' + '0' + currentMonth + '-' + today ;

formInputDate.setAttribute("max", currentDate);
