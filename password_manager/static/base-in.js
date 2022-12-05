// Logout Button
document.getElementById("logout").onsubmit = (e) => {
  console.log("logout");
  e.preventDefault();
  console.log("logout1");
  $.ajax({
    type: "POST",
    url: "/requests",
    data: {
      type: "logout",
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: function (data) {
      console.log("data");
      if (data.ok == true) {
      console.log("data1");
        window.location = "/home"
      }
    },
  })
}
