const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const form = document.getElementById("form");

function validateEmail(loginEmailInput) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(loginEmailInput);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const loginEmailInput = loginEmail.value;
  const loginPasswordInput = loginPassword.value;
  const loginUrl = "http://167.71.82.123:8081/signup";
  let error = {}

  if (loginEmailInput === "" || loginEmailInput.trim() === '') {
    error.email = 'Email field is empty'
  } else if (!validateEmail(loginEmailInput)) {
    error.email = 'Email is incorrect'
  }

  if (loginPasswordInput === "" || loginPasswordInput.trim() === '') {
    error.password = 'Password field is empty'
  }
  
  if (Object.keys(error).length > 0) {
    alert(JSON.stringify(error, null, 4))
    console.log(JSON.stringify(error, null, 4));

    return
  }

  fetch(loginUrl, {
    method: 'POST',
    credentials: 'include',
  }).then(response => response.text()).then((data) => {
    console.log(data);
  }).catch(error => {
    console.log('error', error)
  });
})
