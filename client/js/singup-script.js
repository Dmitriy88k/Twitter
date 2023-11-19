const form = document.getElementById('form-signup');
const userName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupRepeatPassword = document.getElementById('signup-repeat-password');

form.addEventListener('submit', event => {
    event.preventDefault();

    const userNameInput = userName.value;
    const signupEmailInput = signupEmail.value;
    const signupPasswordInput = signupPassword.value;
    const signupRepeatPasswordInput = signupRepeatPassword.value;
    const signupUrl = `${backendUrl}/signup`;

    //validation
    if (signupPasswordInput !== signupRepeatPasswordInput) {
        alert('The password is not the same');
        return;
    }

    //fetch with redirect

    fetch(signupUrl, {
        method: 'POST',
        body: JSON.stringify({
            name: userNameInput,
            email: signupEmailInput,
            password: signupPasswordInput,
        }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
        // .then(response => response.text())
        .then(response => {
            if (response.ok) {
                window.location.href = `${location.origin}/feed.html`;
            }
        })
        .catch(error => {
            console.log('error', error);
        });
});
