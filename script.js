const resetBtnEl = document.querySelector('.btn-reset');
const billAmountEl = document.querySelector('.bill-amount');
const personCountEl = document.querySelector('.person-count-input');

const billAmountBox = document.querySelector('.bill-input-box');
const personCountInputBox = document.querySelector('.person-input-box');

let tipAmountInputEl = document.querySelector('.tip-amount-input');
let tipAmountValueEl = document.querySelector('.tip-amount-value');
let totalAmountValueEl = document.querySelector('.total-amount-value');

const billErrorEl = document.querySelector('.error-bill-empty');
const noPersonErrorEl = document.querySelector('.error-person-0');
const tipPercentErrorEl = document.querySelector('.tip-percent-error');

let billAmount;
let tipPercentage;
let personCount;

const colorPrimary =  'hsl(172, 67%, 45%)';
const veryDarkCyan =  'hsl(183, 100%, 15%)';
const veryLightGrayishCyan =  'hsl(185, 41%, 84%)';

document.querySelectorAll('.tip-amount').forEach(el => {
    
});

// reset input fiels and results
resetBtnEl.addEventListener('click', function(e) {
    e.preventDefault();
    billAmountEl.value = '';
    personCountEl.value = '';
    tipAmountInputEl.value = '';
    tipPercentage = 0;

    billErrorEl.classList.add('hidden');
    noPersonErrorEl.classList.add('hidden');
    tipPercentErrorEl.classList.add('hidden');

    billAmountBox.style.border = '';
    personCountInputBox.style.border = '';

    tipAmountValueEl.innerText = '$0.0';
    totalAmountValueEl.innerText = '$0.0';
});

resetBtnEl.addEventListener('mouseover', function(e) {
    resetBtnEl.style.backgroundColor = veryLightGrayishCyan;
});

resetBtnEl.addEventListener('mouseout', function(e) {
    resetBtnEl.style.backgroundColor = '';
});

billAmountEl.addEventListener('input', function() {

    billAmount = +billAmountEl.value;
    
    // removing error msgs
    billErrorEl.classList.add('hidden');
    billAmountBox.style.border = 'none';

    if (!billAmount || billAmount === 0) {
        // adding error msgs
        billErrorEl.classList.remove('hidden');
        billAmountBox.style.border = '1px solid red';
        return;
    }
});

// fetching tip percentage
document.querySelectorAll('.tip-amount').forEach(el => {    
    el.addEventListener('click', function(e) {

        let nodes = el.parentElement.children;
        console.log(nodes);
        for(var i=0; i<nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() == 'div') {
                nodes[i].style.backgroundColor = 'none';
                nodes[i].style.color = 'none';
            }
        };

        tipPercentErrorEl.classList.add('hidden');

        el.style.backgroundColor = colorPrimary;
        el.style.color = veryDarkCyan;

        tipPercentage = +el.innerText.replace('%', '');

        // if (!tipPercentage) {
        //     tipPercentErrorEl.classList.remove('hidden');
        //     return;
        // }
    });

    el.addEventListener('mouseover', function() {
        el.style.backgroundColor = veryLightGrayishCyan; 
        el.style.color = veryDarkCyan; 
    });

    el.addEventListener('mouseout', function() {
        el.style.backgroundColor = ''; 
        el.style.color = ''; 
    });
});

tipAmountInputEl.addEventListener('input', function() {
    tipPercentErrorEl.classList.add('hidden');

    tipPercentage = +tipAmountInputEl.value;
    console.log(tipPercentage);

    if (!tipPercentage) {
        tipPercentErrorEl.classList.remove('hidden');
        return;
    }
});

personCountEl.addEventListener('input', function() {
    personCount = +personCountEl.value;

    // removing error msgs
    noPersonErrorEl.classList.add('hidden');
    personCountInputBox.style.border = 'none';

    if (!billAmountEl.value) {
        billErrorEl.classList.remove('hidden');
        billAmountBox.style.border = '1px solid red';
        return;
    }

    if (!tipPercentage) {
        tipPercentErrorEl.classList.remove('hidden');
        return;
    }

    if (!personCount || personCount === 0) {
        // adding error msgs
        noPersonErrorEl.classList.remove('hidden');
        personCountInputBox.style.border = '1px solid red';
        return;
    }

    // calculating tips

    let billPerPerson = billAmountEl.value / personCountEl.value;
    let tipAmount = billAmountEl.value * (tipPercentage / 100);
    let tipPerPerson = tipAmount / personCountEl.value;

    let finalBillPerPerson = billPerPerson + tipPerPerson;

    tipAmountValueEl.innerText = `$${tipPerPerson.toFixed(2)}`;
    totalAmountValueEl.innerText = `$${finalBillPerPerson.toFixed(2)}`;
});


