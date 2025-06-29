let autenticado = sessionStorage.getItem("auth");
if (autenticado != "true") {
  window.location = "../index.html";
}
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});
