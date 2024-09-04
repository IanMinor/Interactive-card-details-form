let nameCard = document.querySelector('.card__details-name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');

//CARD NUMBER
let numberCard = document.querySelector('.card__number');
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

// MM
let monthCard = document.querySelector('.card__month');
let monthInput = document.querySelector('#cardMonth');
let montErrorDiv = document.querySelector('.form__input-mm--error');

// YY
let yearCard = document.querySelector('.card__year');
let yearInput = document.querySelector('#cardYear');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

// CVC
let cvcCard = document.querySelector('.card-back__cvc');
let cvcInput = document.querySelector('#cardCvc');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');

nameInput.addEventListener('input', () => {
    if (nameInput.value == '') {
        nameCard.innerText = 'JANE APPLESEED'
    } else {
        nameCard.innerText = nameInput.value;
    }
});

// Ingreso dinamico del numero
numberInput.addEventListener('input', (e) => {

    let inputValue = e.target.value;

    // Actualizando graficamente la tarjeta
    numberCard.innerText = numberInput.value;

    //Validando que haya una letra
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');
    } else {
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrorDiv, '', false);

    }

    // Mostrando los 0s por defecto cuando no se ha ingresado nada
    if (numberInput.value == '') {
        numberCard.innerText = '0000 0000 0000 0000';
    }

});

// Ingreso dinámico del mes
monthInput.addEventListener('input', () => {
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, montErrorDiv);
});

// Ingreso dinamico del año
yearInput.addEventListener('input', () => {
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv)
});

// Ingreso dinamico del cvc
cvcInput.addEventListener('input', () => {
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});



// Boton confirm
let confirmBtn = document.querySelector('.form__submit');
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Secciones formulario y thanks
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');


confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Validar Name
    if (verifyIsFilled(nameInput, nameErrorDiv)) {
        nameValidation = true;
    } else {
        nameValidation = false;
    }

    // Validar Numero
    if (verifyIsFilled(numberInput, numberErrorDiv)) {
        if (numberInput.value.length === 19) {
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        } else {
            showError(numberInput, numberErrorDiv, 'Wrong number');
            numberValidation = false;
        }
    }


    // Validar Mes
    if (verifyIsFilled(monthInput, montErrorDiv)) {
        if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
            showError(monthInput, montErrorDiv, '', false);
            monthValidation = true;
        } else {
            showError(monthInput, montErrorDiv, 'Wrong month');
            monthValidation = false;
        }
    }


    // Validar año
    if (verifyIsFilled(yearInput, yearErrorDiv)) {
        if (parseInt(yearInput.value) > 24 && parseInt(yearInput.value) <= 29) {
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        } else {
            showError(yearInput, yearErrorDiv, 'Wrong year');
            yearValidationValidation = false;
        }
    }

    // Validar cvc
    if (verifyIsFilled(cvcInput, cvcErrorDiv)) {
        if (cvcInput.value.length === 3) {
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        } else {
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
            cvcValidation = false;
        }
    }

    if (nameValidation && numberValidation && monthValidation && yearValidation && cvcValidation) {
        formSection.style.display = 'none';
        thanksSection.style.display = 'unset';
    }
});


function showError(divInput, divError, msgError, show = true) {
    if (show) {
        divError.innerText = msgError;
        divInput.style.borderColor = '#ff0000';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}


function verifyIsFilled(divInput, divError) {
    if (divInput.value.length > 0) {
        showError(divInput, divError, "", false);
        return true;
    } else {
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}

function validateLetters(input, divError) {
    // Validando que haya una letra
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input, divError, 'Wrong format, numbers only');
    } else {
        showError(input, divError, '', false);
    }
}