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
document.getElementById("customize").addEventListener("change", generatePassword);
document.getElementById("copy").onclick = async () => {
  navigator.clipboard.writeText(document.getElementById("password").value);
};
document.getElementById("generate").addEventListener("click", generatePassword);
