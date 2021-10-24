const setupForm = () => {

    const form = document.querySelector('.form-body');
    const inputs = [...form.querySelectorAll('.required')];
    const fileInput = form.querySelector('.file-input');
    const filePreview = form.querySelector('.file-preview');
    let formErrors = 0;

    form.addEventListener('submit', event => {
        event.preventDefault();
        formErrors = 0;
        inputs.forEach(input => checkInput(input));
        if (formErrors) return;
        form.innerHTML = '<h1>Thanks for your data!</h1>';
    });

    inputs.forEach(input => input.addEventListener('change', () => checkInput(input)));

    fileInput.addEventListener('change', () => checkFileInput());

    const checkInput = input => {
        const id = input.id;
        switch (id) {
            case 'username':
                checkUsername(input);
                break;
            case 'email':
                checkEmail(input);
                break;
            case 'user-agreement':
                checkAgreement(input);
                break;    
        }
    };

    const checkUsername = input => {
        const re = /^[a-zA-Z0-9_-]{4,20}$/;
        const value = input.value.trim();
        if (!value) displayError(input, 'This field is required!');
        else if (!re.test(value)) displayError(input, 'Only a-zA-Z0-9-_ signs, length 4-20 signs!');
        else displaySuccess(input);
    };

    const checkEmail = input => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const value = input.value.trim();
        if (!value) displayError(input, 'This field is required!');
        else if (!re.test(value)) displayError(input, 'Email is not valid!');
        else displaySuccess(input);
    };

    const checkAgreement = input => {
        if (!input.checked) displayError(input, 'This field is required!');
        else displaySuccess(input);
    };

    const checkFileInput = () => {
        const types = ['image/jpeg', 'image/jpg', 'image/png'];
        const file = fileInput.files[0];
        if (!types.includes(file.type)) {
            displayError(fileInput, 'Only jpeg, jpg, png files!');
            fileInput.value = '';
            filePreview.innerHTML = '';
        } else if (file.size > 2e+6) {
            displayError(fileInput, 'File size more then 2mb!');
            fileInput.value = '';
            filePreview.innerHTML = '';
        } else {
            displaySuccess(fileInput);
            loadPreview(file);
        }
    };

    const loadPreview = file => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.addEventListener('load', () => URL.revokeObjectURL(url));
        filePreview.innerHTML = '';
        filePreview.append(img);
    };

    const displayError = (input, message) => {
        const parent = input.parentElement;
        parent.classList.add('error');
        parent.lastElementChild.textContent = message;
        formErrors++;
    };

    const displaySuccess = input => {
        const parent = input.parentElement;
        parent.classList.remove('error');
        parent.lastElementChild.textContent = '';
    };

};

setupForm();