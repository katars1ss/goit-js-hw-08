import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input[name=email]'),
    message: document.querySelector('.feedback-form input[name=message]'),
};

let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateFormData();

function onFormSubmit(event) {
    event.preventDefault();
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
};


function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateFormData() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) {
        for (key in data) { 
            refs[key].value = data[key];
        }
    };
}
