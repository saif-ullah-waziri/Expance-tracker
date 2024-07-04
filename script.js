const balance = document.getElementById("balance");
const money_minus = document.getElementById("money-minus");
const money_plus = document.getElementById("money-plus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const form = document.getElementById("form");

const localStorageTransaction = JSON.parse(localStorage.getItem('transections'));
let transections = localStorage.getItem('transections') !== null ? localStorageTransaction : [];

//Add transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("please add text and amount");
    }
    else {
        const transaction = {
            id: rendId(),
            amount: +amount.value,
            text: text.value
        }
        transections.push(transaction);
        addTranscectinDom(transaction);
        updateValues();
        updatLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

//generat rendom id
function rendId() {
    return Math.floor(Math.random() * 100000000);
}

//function add transection to dom list
function addTranscectinDom(transection) {
    const sign = transection.amount < 0 ? '-' : '+';
    //now add element
    const item = document.createElement('li');
    item.classList.add(transection.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
    ${transection.text} <span>${sign} ${Math.abs(transection.amount)}</span>
    <button class="delet-btn" onclick="deleteTransaction(${transection.id})">x</button>
    `;
    list.appendChild(item);
}

//update the balace,inco and expense
function updateValues() {
    const amounts = transections
        .map(transection => transection.amount);
    const total = amounts
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

    balance.innerHTML = `$${total}`;
    money_minus.innerHTML = `$${expense}`;
    money_plus.innerHTML = `$${income}`;
}

updateValues();

////-------------remove transection
function deleteTransaction(id) {
    transections = transections.filter(transaction => transaction.id !== id);
    updatLocalStorage();
    init();
}

//updat local storage transaction
function updatLocalStorage() {
    localStorage.setItem('transections', JSON.stringify(transections));
}

//init function
function init() {
    list.innerHTML = '';
    transections.forEach(addTranscectinDom);
}

init();
form.addEventListener('submit', addTransaction);