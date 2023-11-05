function clearPlaceholder(input) {
  input.placeholder = "";
}

function restorePlaceholder(input, defaultPlaceholder) {
  if (input.value === '') {
    input.placeholder = defaultPlaceholder;
  }
}

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");


loginButton.addEventListener("click", function() {
  const loginEmailInput = loginEmail.value;
  const loginPasswordInput = loginPassword.value;
  const loginUrl = "http://167.71.82.123:8081/signup";

  fetch(loginUrl).then(response => response.json()).then((data) => {
    function validateEmail(loginEmailInput) {
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(loginEmailInput);
    }
    
    if (validateEmail(loginEmailInput)) {
      console.log("Valid email address.");
    } else {
      console.log("Invalid email address.");
    }
    if (loginEmailInput === data.email && loginPasswordInput === data.password) {
      console.log("everything is good");
    }
  }).catch(error => {
    if (loginEmailInput === "" && loginPasswordInput === "") {
      alert("Email and password are empty");
    }
    if (loginEmailInput === "") {
      alert("Email field is empty");
    }
    if (loginPasswordInput === "") {
      alert("Password field is empty");
    }
  });
});





