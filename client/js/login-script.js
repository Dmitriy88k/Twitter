const backendUrl = 'http://167.71.82.123:8081';
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const signinForm = document.getElementById('form-signin');

function validateEmail(loginEmailInput) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(loginEmailInput);
}

signinForm.addEventListener('submit', event => {
    event.preventDefault();

    const loginEmailInput = loginEmail.value;
    const loginPasswordInput = loginPassword.value;
    const loginUrl = `${backendUrl}/login`;
    let error = {};

    if (loginEmailInput === '' || loginEmailInput.trim() === '') {
        error.email = 'Email field is empty';
    } else if (!validateEmail(loginEmailInput)) {
        error.email = 'Email is incorrect';
    }

    if (loginPasswordInput === '' || loginPasswordInput.trim() === '') {
        error.password = 'Password field is empty';
    }

    if (Object.keys(error).length > 0) {
        alert(JSON.stringify(error, null, 4));
        console.log(JSON.stringify(error, null, 4));

        return;
    }

    fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify({
            email: loginEmailInput,
            password: loginPasswordInput,
        }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    localStorage.setItem('token', data.token);
                    window.location.href = `${location.origin}/feed`;
                });
            }
        })
        .catch(error => {
            console.log('error', error.message);
        });
});
