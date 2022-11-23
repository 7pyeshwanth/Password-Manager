
const shuffle = (list) => {
  for (let i = 0; i < Math.floor(Math.random() * 70); i++) {
    let x = Math.floor(Math.random() * list.length);
    let y = Math.floor(Math.random() * list.length);
    let t = list[x];
    list[x] = list[y];
    list[y] = t;
  }
  return list
}
const generatePassword = () => {
  length = document.getElementById("length").value;
  let upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let symbols = ["!", "@", "#", "$", "%", "^", "*", "_", "-", "=", "+"];
  let numbres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let password = [];
  let characters = [];
  if (document.getElementById("upper").checked) {
    password.push(upper[Math.floor(Math.random() * upper.length)]);
    password.push(upper[Math.floor(Math.random() * upper.length)]);
    characters = characters.concat(upper);
    shuffle(password);
    length -= 2;
  }
  if (document.getElementById("lower").checked) {
    password.push(lower[Math.floor(Math.random() * lower.length)]);
    password.push(lower[Math.floor(Math.random() * lower.length)]);
    characters = characters.concat(lower);
    shuffle(password);
    length -= 2;
  }
  if (document.getElementById("symbols").checked) {
    password.push(symbols[Math.floor(Math.random() * symbols.length)]);
    password.push(symbols[Math.floor(Math.random() * symbols.length)]);
    characters = characters.concat(symbols);
    shuffle(password);
    length -= 2;
  }
  if (document.getElementById("numbers").checked) {
    password.push(numbres[Math.floor(Math.random() * numbres.length)]);
    password.push(numbres[Math.floor(Math.random() * numbres.length)]);
    characters = characters.concat(numbres);
    shuffle(password);
    length -= 2;
  }
  shuffle(characters);
  for (let i = 0; i < length; i++) {
    password.push(characters[Math.floor(Math.random() * characters.length)]);
    shuffle(password);
  }
  password = password.join("");
  document.getElementById("password").value = password;
}
window.addEventListener("onload", generatePassword());
document.getElementById("upper").onclick = (e) => {
  if (!document.getElementById("upper").checked && !document.getElementById("lower").checked && !document.getElementById("symbols").checked && !document.getElementById("numbers").checked) {
    e.preventDefault();
  }
}
document.getElementById("lower").onclick = (e) => {
  if (!document.getElementById("upper").checked && !document.getElementById("lower").checked && !document.getElementById("symbols").checked && !document.getElementById("numbers").checked) {
    e.preventDefault();
  }
}
document.getElementById("symbols").onclick = (e) => {
  if (!document.getElementById("upper").checked && !document.getElementById("lower").checked && !document.getElementById("symbols").checked && !document.getElementById("numbers").checked) {
    e.preventDefault();
  }
}
document.getElementById("numbers").onclick = (e) => {
  if (!document.getElementById("upper").checked && !document.getElementById("lower").checked && !document.getElementById("symbols").checked && !document.getElementById("numbers").checked) {
    e.preventDefault();
  }
}
document.getElementById("length").onchange = () => {
  document.getElementById("display_length").value = document.getElementById("length").value
}
document.getElementById("display_length").onchange = () => {
  let display_length = document.getElementById("display_length");
  let display = document.getElementById("length");
  if (display_length.value < 8) {
    display_length.value = 8;
  }
  if (display_length.value > 64) {
    display_length.value = 64;
  }
  display.value = display_length.value;
}
document.getElementById("pass-change").addEventListener("change", generatePassword);
document.getElementById("copy").onclick = async () => {
  navigator.clipboard.writeText(document.getElementById("password").value);

};
document.getElementById("generate").addEventListener("click", generatePassword);
document.getElementById("login-form").onsubmit = (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/login",
    data: {
      email: $("#login-email").val(),
      password: $("#login-password").val(),
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: function (data) {
      if (data.ok == true) {
        alert("Your account has been logged in successfully")
        window.location = "/home";
      } else {
        $("#login-cred-val").html(data.error);
      }
    },
  });
};
const change = () => {
  document.getElementById("login-cred-val").innerHTML = "";
};
document.getElementById("login-password").addEventListener("change", change);
document.getElementById("login-email").addEventListener("change", change);
document.getElementById("login-password").onkeyup = () => {
  if (!document.getElementById("login-password").value.match(/[a-z]/g)) {
    document.getElementById("login-password-val").innerHTML = "Password must contain a lowercase letter"
  } else if (!document.getElementById("login-password").value.match(/[A-Z]/g)) {
    document.getElementById("login-password-val").innerHTML = "Password must contain a uppercase letter"
  } else if (!document.getElementById("login-password").value.match(/[0-9]/g)) {
    document.getElementById("login-password-val").innerHTML = "Password must contain a number"
  } else if (!document.getElementById("login-password").value.match(/[!@#\$%\^&\*]/g)) {
    document.getElementById("login-password-val").innerHTML = "Password must contain a special character"
  } else if (document.getElementById("login-password").value.length < 8) {
    document.getElementById("login-password-val").innerHTML = "Password must contain atleast 8 characters"
  } else {
    document.getElementById("login-password-val").innerHTML = ""
  }
};
document.getElementById("login-password").onblur = () => {
  if (document.getElementById("login-password").value == "") {
    document.getElementById("login-password-val").innerHTML = "Required";
  }
  else {
    document.getElementById("login-password-val").innerHTML = "";
  }
};
document.getElementById("login-email").onblur = () => {
  if (document.getElementById("login-email").value == "") {
    document.getElementById("login-email-val").innerHTML = "Required";
  }
  else {
    document.getElementById("login-email-val").innerHTML = "";
  }
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(document.getElementById("login-email").value)) {
    document.getElementById("login-email-val").innerHTML = "Please enter valid email address"
  }
  else {
    document.getElementById("login-email-val").innerHTML = ""
  }
};
document.getElementById("signup-name").onblur = () => {
  if (document.getElementById("signup-name").value == "") {
    document.getElementById("signup-name-val").innerHTML = "Required";
  }
  else {
    document.getElementById("signup-name-val").innerHTML = "";
  }
};
document.getElementById("signup-email").onblur = () => {
  if (document.getElementById("signup-email").value == "") {
    document.getElementById("signup-email-val").innerHTML = "Required";
  }
  else {
    document.getElementById("signup-email-val").innerHTML = "";
  }
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(document.getElementById("signup-email").value)) {
    document.getElementById("signup-email-val").innerHTML = "Please enter valid email address"
  }
  else {
    document.getElementById("signup-email-val").innerHTML = ""
  }
};
document.getElementById("signup-password").onkeyup = () => {
  if (!document.getElementById("signup-password").value.match(/[a-z]/g)) {
    document.getElementById("signup-password-val").innerHTML = "Password must contain a lowercase letter"
  } else if (!document.getElementById("signup-password").value.match(/[A-Z]/g)) {
    document.getElementById("signup-password-val").innerHTML = "Password must contain a uppercase letter"
  } else if (!document.getElementById("signup-password").value.match(/[0-9]/g)) {
    document.getElementById("signup-password-val").innerHTML = "Password must contain a number"
  } else if (!document.getElementById("signup-password").value.match(/[!@#\$%\^&\*]/g)) {
    document.getElementById("signup-password-val").innerHTML = "Password must contain a special character"
  } else if (document.getElementById("signup-password").value.length < 8) {
    document.getElementById("signup-password-val").innerHTML = "Password must contain atleast 8 characters"
  } else {
    document.getElementById("signup-password-val").innerHTML = ""
  }
};
document.getElementById("signup-confirm-password").onblur = () => {
  if (document.getElementById("signup-password").value != document.getElementById("signup-confirm-password").value) {
    document.getElementById("signup-confirm-password-val").innerHTML = "Confirm Password not match"
  }
  else {
    document.getElementById("signup-confirm-password-val").innerHTML = ""
  }
}
document.getElementById("signup-form").onsubmit = (e) => {
  e.preventDefault();
  if (document.getElementById("signup-password").value == document.getElementById("signup-confirm-password").value) {
    $.ajax({
      type: "POST",
      url: "/signup",
      data: {
        name: $("#signup-name").val(),
        email: $("#signup-email").val(),
        password: $("#signup-password").val(),
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      },
      success: function (data) {
        if (data.ok == true) {
          alert("Your account has been created successfully Please verify your email address to activate your account")
          window.location = "/home"
        }
        else {
          $("#signup-cred-val").html(data.error);
        }
      },
    });
  }
}
document.getElementById("name").addEventListener("keyup", () => {
  document.getElementById("name-val").innerHTML = "";
})
document.getElementById("save-form").onsubmit = (e) => {
  e.preventDefault();
  console.log("in")
  if (document.getElementById("name").value == "") {
    document.getElementById("name-val").innerHTML = "Required";
  }
  else if (document.getElementById("name").value.match(/[!@#\$%\^&\*]/g)) {
    document.getElementById("name-val").innerHTML = "Name should not contain any special characters";
  }
  else if ((document.getElementById("signup-password").value.match(/[A-Z]/g) || document.getElementById("signup-password").value.match(/[a-z]/g))) {
    document.getElementById("name-val").innerHTML = "Name should contain letters";
  }
  else {
    $.ajax({
      type: "POST",
      url: "/save",
      data: {
        name: $("#name").val(),
        password: $("#password").val(),
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      },
      success: function (data) {
        if (data.ok == true) {
          console.log("true")
          alert("Password saved successfully");
        }
        else {
          $("#name-val").html(data.error);
        }
      }
    })
  }
}