let id = null;
window.onload = function () {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const intcartas = document.getElementById("cartas");
  const corr = sessionStorage.getItem("correo");
  const columna = document.getElementById("columnaIzquierda");
  const columnaD = document.getElementById("publicarImg");

  foto = users[corr].fPerfil;
  nombre = users[corr].name;
  apellido = users[corr].lastname;
  pais = users[corr].pais;
  ciudad = users[corr].ciudad;
  telefono = users[corr].telefono;
  direccion = users[corr].direccion;
  postal = users[corr].postal;

  // alert(nombre);
  // alert(apellido);
  // alert(corr);
  // alert(pais);
  // alert(ciudad);
  // alert(telefono);

  if (columna) {
    columna.innerHTML =
      `<img
          class="perfil-img"
          src="${foto}"
          alt=""
        />
        <h2>${nombre} ${apellido}</h2>
        <h4 class = "email">${corr}</h4>
        <h3>Pais: ${pais}</h3>
        <h3>Ciudad: ${ciudad}</h3>
        <h3>Telefono: ${telefono}</h3>
        <h3>Direccion: ${direccion}</h3>
        <h3>Codigo postal: ${postal}</h3>
        ` + columna.innerHTML;
  }

  if (columnaD) {
    columnaD.innerHTML =
      ` <img
              class="input-img"
              src="${foto}"
              alt=""
            /> 
  ` + columnaD.innerHTML;
  }

  Object.keys(inventario).forEach((correo) => {
    const productos = Object.values(inventario[correo]);

    productos
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Orden por fecha descendente
      .forEach((item) => {
        let sfpubli = item.price;
        if (sfpubli === "") {
          intcartas.innerHTML =
            `
         <div class="col-12 mb-4">
              <div class="card h-100 rounded-15">
                <div class="port">
                  <img
                    src="${item.img}"
                    alt=""
                  />
                  <h2 class="titulo-card nombrepub">${item.autor}</h2>
                </div>
                <h5 class="card-title textosp">${item.name}</h5>
                <div class="textosp">
                  <p class="card-text">
                    ${item.description}
                  </p>
                </div>
                <footer class="textof">
                  <h6>fecha de publicacion: ${item.fecha}</h6>
                </footer>
              </div>
            </div>
        ` + intcartas.innerHTML;
        } else {
          intcartas.innerHTML =
            `
         <div class="col-12 mb-4">
              <div class="card h-100 rounded-15">
                <div class="port">
                  <img
                    src="${item.img}"
                    alt=""
                  />
                  <h2 class="titulo-card nombrepub">${item.autor}</h2>
                </div>
                <h5 class="card-title textosp">${item.name}</h5>
                <img
                  src="${item.price}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="textosp">
                  <p class="card-text">
                    ${item.description}
                  </p>
                </div>
                <footer class="textof">
                  <h6>fecha de publicacion: ${item.fecha}</h6>
                </footer>
              </div>
            </div>
        ` + intcartas.innerHTML;
        }
      });
  });
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

  if (!productName.value || !productDescription.value) {
    alert("Campos vacios. Nombre y Descripcion son obligatorios");
  } else {
    let counter = Number(localStorage.getItem("counter")) || 0;
    let corr = sessionStorage.getItem("correo");
    counter++;
    let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let hora = new Date().toLocaleString("es-CO");
    let autor2 = users[corr].name + " " + users[corr].lastname;
    let imagen = users[corr].fPerfil;
    inventario[corr][counter] = {
      name: productName.value.toLowerCase(),
      price: productPrice.value.toLowerCase().trim(""),
      description: productDescription.value.toLowerCase(),
      autor: autor2,
      fecha: hora,
      img: imagen,
    };
    localStorage.setItem("inventario", JSON.stringify(inventario));
    localStorage.setItem("counter", counter);
    document.getElementById("newProductForm").reset();

    location.reload();
    console.log(products2);
  }
}
