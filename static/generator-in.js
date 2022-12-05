// Save Password
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
  else if ((!document.getElementById("name").value.match(/[A-Z]/g) && !document.getElementById("name").value.match(/[a-z]/g))) {
    document.getElementById("name-val").innerHTML = "Name should contain letters";
  }
  else {
    console.log("in2")
    $.ajax({
      type: "POST",
      url: "/requests",
      data: {
        type:"save",
        name: $("#name").val(),
        password: $("#password").val(),
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      },
      success: function (data) {
        if (data.ok == true) {
          console.log("true")
          Swal.fire(
            'Saved!',
            'Password saved successfully',
            'success'
          ).then(() => location.reload())
        }
        else {
          $("#name-val").html(data.error);
        }
      }
    })
  }
}