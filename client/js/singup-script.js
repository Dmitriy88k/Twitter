const signupForm = document.getElementById("form-signup");
const userName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupRepeatPassword = document.getElementById("signup-repeat-password");
const hamburgerBtn = document.getElementById("hamburger");
const smallScreenQuery = window.matchMedia("(max-width: 768px)");
const mobileMenu = document.getElementById("mobile-nav");

function validateEmail(signupEmail) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(signupEmail);
}

hamburgerBtn.addEventListener("click", function () {
  if (smallScreenQuery.matches) {
    hamburgerBtn.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
  } else {
    console.log("Error");
  }
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userNameInput = userName.value;
  const signupEmailInput = signupEmail.value;
  const signupPasswordInput = signupPassword.value;
  const signupRepeatPasswordInput = signupRepeatPassword.value;
  const signupUrl = `${backendUrl}/signup`;

  if (signupPasswordInput !== signupRepeatPasswordInput) {
    alert("Passwords do not match!")
  }

  if (userNameInput === "" && signupEmailInput === "" && signupPasswordInput === "" && signupRepeatPasswordInput === "") {
    alert("Please fill out the fields");
  } else if (signupEmailInput === "") {
    alert("Email is Empty");
  } else if (signupPasswordInput === "") {
    alert("Password is Empty");
  } else if (signupRepeatPasswordInput === "") {
    alert("Repeat Password field is Empty");
  }

  //fetch with redirect

  fetch(signupUrl, {
    method: "POST",
    body: JSON.stringify({
      name: userNameInput,
      username: signupEmailInput,
      email: signupEmailInput,
      password: signupPasswordInput,
    }),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    // .then(response => response.text())
    .then((response) => {
      if (response.ok) {
        window.location.href = `${location.origin}/feed`;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
});
