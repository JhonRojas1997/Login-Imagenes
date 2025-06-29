let id = null;
window.onload = function () {
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  let corr = sessionStorage.getItem("correo");
  const intcartas = document.getElementById("cartas");
  for (i in inventario[corr]) {
    intcartas.innerHTML += `
 <div class="col-md-4 mb-4">
          <div class="card h-100">
            <h5 class="card-title p-3">${inventario[corr][i].name}</h5>
            <img
              src="${inventario[corr][i].price}"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <p class="card-text">${inventario[corr][i].description}</p>

              <div class="btn btn-primary">Eliminar</div>
              <div class="btn btn-primary">actualizar</div>
            </div>
          </div>
        </div>`;
  }
};

const rows = document.querySelectorAll(".productRow");

function logout() {
  sessionStorage.setItem("auth", false);
  window.location = "../index.html";
}
function add() {
  const productName = document.getElementById("productName");
  const productPrice = document.getElementById("productPrice");
  const productDescription = document.getElementById("productDescription");
  const intcartas = document.getElementById("cartas");
  if (!productName.value || !productDescription.value || !productPrice.value) {
    alert("Campos vacios. Llene todos los campos");
  } else {
    let counter = Number(localStorage.getItem("counter")) || 0;
    let corr = sessionStorage.getItem("correo");
    counter++;
    let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
    inventario[corr][counter] = {
      name: productName.value.toLowerCase(),
      price: productPrice.value.toLowerCase(),
      description: productDescription.value.toLowerCase(),
    };
    localStorage.setItem("inventario", JSON.stringify(inventario));
    localStorage.setItem("counter", counter);
    document.getElementById("newProductForm").reset();
    location.reload();
    console.log(products2);
  }
}
function update() {
  const productName2 = document.getElementById("productName2");
  const productPrice2 = document.getElementById("productPrice2");
  const productDescription2 = document.getElementById("productDescription2");
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  let corr = sessionStorage.getItem("correo");
  if (productName2.value) {
    inventario[corr][id] = {
      name: productName2.value.toLowerCase(),
      price: inventario[corr][id].price,
      description: inventario[corr][id].description,
    };
  }
  if (productPrice2.value) {
    inventario[corr][id] = {
      name: inventario[corr][id].name,
      price: productPrice2.value.toLowerCase(),
      description: inventario[corr][id].description,
    };
  }
  if (productDescription2.value) {
    inventario[corr][id] = {
      name: inventario[corr][id].name,
      price: inventario[corr][id].price,
      description: productDescription2.value.toLowerCase(),
    };
  }

  if (
    !productName2.value &&
    !productPrice2.value &&
    !productDescription2.value
  ) {
    alert(" No relleno ningun campo");
  }

  localStorage.setItem("inventario", JSON.stringify(inventario));
  document.getElementById("updtProductForm")?.reset();
  console.log("Producto actualizado:", inventario[corr][id]);
  location.reload();
}

function deleteProduct(button) {
  const row = button.closest("tr");
  const id = row.querySelector("td").innerText.trim("");
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  let corr = sessionStorage.getItem("correo");
  delete inventario[corr][id];
  localStorage.setItem("inventario", JSON.stringify(inventario));
  location.reload();
}
