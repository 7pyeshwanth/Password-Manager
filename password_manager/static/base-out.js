// Signup
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
  else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(document.getElementById("signup-email").value)) {
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
      url: "/requests",
      data: {
        type: "signup",
        name: $("#signup-name").val(),
        email: $("#signup-email").val(),
        password: $("#signup-password").val(),
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      },
      success: function (data) {
        if (data.ok == true) {
          window.location = "/home"
        }
        else {
          $("#signup-cred-val").html(data.error);
        }
      },
    });
  }
}

// Login
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
  else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(document.getElementById("login-email").value)) {
    document.getElementById("login-email-val").innerHTML = "Please enter valid email address"
  }
  else {
    document.getElementById("login-email-val").innerHTML = ""
  }
};
document.getElementById("login-form").onsubmit = (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/requests",
    data: {
      type: "login",
      email: $("#login-email").val(),
      password: $("#login-password").val(),
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: function (data) {
      if (data.ok == true) {
        window.location = "/home";
      } else {
        $("#login-cred-val").html(data.error);
      }
    },
  });
};
