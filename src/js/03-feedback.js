import throttle from 'lodash.throttle';

const STORAGE_KEYS = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input[name=email]'),
    message: document.querySelector('.feedback-form textarea'),
};

let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateFormData();

function onFormSubmit(event) {
    event.preventDefault();
    event.target.reset();
    localStorage.removeItem(STORAGE_KEYS);
};


function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEYS, JSON.stringify(formData));
};

function populateFormData() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEYS));
    if (savedData) {
        for (const key in savedData) { 
            refs[key].value = savedData[key];
        }
    };
}
