const form = document.querySelector("form");
const url = window.location.origin + "/api/auth/";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = document.querySelector("button");
  btn.disabled = true;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  if (email === "" || password === "") return false;
  fetch(url + "login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
    .then((resp) => resp.json())
    .then(({ errors, msg, token }) => {
      if (errors || msg) {
        console.log(erros);
      } else {
        localStorage.setItem("token", token);
        window.location = 'chat.html';
      }
      btn.disabled = false;
    })
    .catch((err) => {
      console.log(err);
      btn.disabled = false;
    });
});

function onSignIn(googleUser) {
  //   const profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log("Name: " + profile.getName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  const id_token = googleUser.getAuthInstance().id_token;
  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_token }),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
      window.location = 'chat.html';
    })
    .catch((err) => console.log(err));
}
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
