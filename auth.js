 // Signup
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("signupUser").value;
  const password = document.getElementById("signupPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    alert("Username already exists!");
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username] === password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html"; // ✅ Must not have /index.html/index.html
  } else {
    alert("Invalid username or password");
  }
});







