const form = document.getElementById('form-signup');
const userName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupRepeatPassword = document.getElementById('signup-repeat-password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userNameInput = userName.value;
  const signupEmailInput = signupEmail.value;
  const signupPasswordInput = signupPassword.value;
  const signupRepeatPasswordInput = signupRepeatPassword.value;
  const signupUrl = "http://167.71.82.123:8081/signup";

  //validation
  if (signupPasswordInput !== signupRepeatPasswordInput) {
    alert("The password is not the same");
    return;
  }

  //fetch with redirect

  fetch(signupUrl, {
    method: 'POST',
    // credentials: 'include',
    body: JSON.stringify({
      name: userNameInput,
      // username: signupEmailInput,
      email: signupEmailInput,
      password: signupPasswordInput
    }),
    headers: {'Content-Type': 'application/json; charset=utf-8',}
  })
  // .then(response => response.text())
  .then((response) => {
   if (response.ok) {
    window.location.href="http://167.71.82.123:8088/feed.html"
   }
    
  }).catch(error => {
    console.log('error', error)
  });
})