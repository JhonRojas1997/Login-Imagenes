let id = null;
window.onload = function () {
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  const users = JSON.parse(localStorage.getItem("users")) || {};
  let corr = sessionStorage.getItem("correo");
  const intcartas = document.getElementById("cartas");
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
  const keys = Object.keys(inventario[corr] || {}).reverse();
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
  keys.forEach((i) => {
    let sfpubli = inventario[corr][i].price;
    if (sfpubli === "") {
      intcartas.innerHTML += `
      <div class="col-12 mb-4">
              <div class="card h-100 rounded-15">
                <div class="port">
                  <img
                    src="${inventario[corr][i].img}"
                    alt=""
                  />
                  <h2 class="titulo-card nombrepub">${inventario[corr][i].autor}</h2>
                </div>
                <h5 class="card-title textosp">${inventario[corr][i].name}</h5>
                <div class="textosp">
                  <p class="card-text">
                    ${inventario[corr][i].description}
                  </p>
                   <button class="btn btn-danger mt-2" onclick="deleteProduct('${i}')">Eliminar</button>
            <button type="button" class="btn btn-primary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#miModal2"
              data-id="${i}"
              data-correo="${corr}"
              onclick="cargarProducto(this)">
              Actualizar
            </button>
                </div>
               
                <footer class="textof">
                  <h6>fecha de publicacion: ${inventario[corr][i].fecha}</h6>
                </footer>
              </div>`;
    } else {
      intcartas.innerHTML += `
      <div class="col-12 mb-4">
              <div class="card h-100 rounded-15">
                <div class="port">
                  <img
                    src="${inventario[corr][i].img}"
                    alt=""
                  />
                  <h2 class="titulo-card nombrepub">${inventario[corr][i].autor}</h2>
                </div>
                <h5 class="card-title textosp">${inventario[corr][i].name}</h5>
                <img
                  src="${inventario[corr][i].price}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="textosp">
                  <p class="card-text">
                    ${inventario[corr][i].description}
                  </p>
                   <button class="btn btn-danger mt-2" onclick="deleteProduct('${i}')">Eliminar</button>
            <button type="button" class="btn btn-primary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#miModal2"
              data-id="${i}"
              data-correo="${corr}"
              onclick="cargarProducto(this)">
              Actualizar
            </button>
                </div>
               
                <footer class="textof">
                  <h6>fecha de publicacion: ${inventario[corr][i].fecha}</h6>
                </footer>
              </div>`;
    }
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
    alert("Campos vacios. Nombre y Descripcion obligatorios");
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
    document.getElementById("newProductForm2").reset();
    location.reload();
    console.log(products2);
  }
}
function update(i) {
  const productName2 = document.getElementById("productName2");
  const productDescription2 = document.getElementById("productDescription2");
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  let corr = sessionStorage.getItem("correo");
  if (productName2.value) {
    inventario[corr][i] = {
      name: productName2.value.toLowerCase(),
      price: inventario[corr][i].price,
      description: inventario[corr][i].description,
    };
  }
  if (productDescription2.value) {
    inventario[corr][i] = {
      name: inventario[corr][i].name,
      price: inventario[corr][i].price,
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

function deleteProduct(i) {
  const corr = sessionStorage.getItem("correo");
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};

  if (inventario[corr] && inventario[corr][i]) {
    delete inventario[corr][i];
    localStorage.setItem("inventario", JSON.stringify(inventario));
    location.reload();
  } else {
    console.warn(`No se pudo eliminar el producto con ID: ${i}`);
  }
}
function cargarProducto(boton) {
  const id = boton.dataset.id;
  const correo = boton.dataset.correo;
  document.getElementById("producto-id").value = id;
  document.getElementById("correo-id").value = correo;
}

function guardarCambios() {
  const id = document.getElementById("producto-id").value;
  const correo = document.getElementById("correo-id").value;
  const nuevoNombre = document.getElementById("productName2").value;
  const nuevaDescripcion = document.getElementById("productDescription2").value;
  const inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  if (!nuevaDescripcion && !nuevoNombre) {
    alert("Campos vacios");
  } else {
    if (nuevoNombre) {
      inventario[correo][id].name = nuevoNombre;
      inventario[correo][id].description = inventario[correo][id].description;
    }
    if (nuevaDescripcion) {
      inventario[correo][id].description = nuevaDescripcion;
      inventario[correo][id].name = inventario[correo][id].name;
    }

    localStorage.setItem("inventario", JSON.stringify(inventario));
    location.reload();
  }
}
function updatePerfil() {
  const corr = sessionStorage.getItem("correo");
  let email = document.getElementById("email").value.toLowerCase();
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let lastname = document.getElementById("lastname").value;
  let pais = document.getElementById("pais").value;
  let ciudad = document.getElementById("ciudad").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let fPerfil = document.getElementById("fPerfil").value;
  let postal = document.getElementById("postal").value;
  email.innerHTML = "";
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  if (
    !email &&
    !password &&
    !name &&
    !lastname &&
    !pais &&
    !ciudad &&
    !telefono &&
    !direccion &&
    !fPerfil &&
    !postal
  ) {
    alert("Todos los campos vacios");
  } else {
    if (users[email]) {
      alert("Este Correo ya se encuentra registrado");
    } else {
      if (name) {
        users[corr] = {
          name: name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (lastname) {
        users[corr] = {
          name: users[corr].name,
          lastname: lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (password) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (pais) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (ciudad) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (telefono) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (direccion) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: direccion,
          postal: users[corr].postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (postal) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: postal,
          fPerfil: users[corr].fPerfil,
        };
      }
      if (fPerfil) {
        users[corr] = {
          name: users[corr].name,
          lastname: users[corr].lastname,
          password: users[corr].password,
          pais: users[corr].pais,
          ciudad: users[corr].ciudad,
          telefono: users[corr].telefono,
          direccion: users[corr].direccion,
          postal: users[corr].postal,
          fPerfil: fPerfil,
        };
      }
      if (email) {
        users[email] = users[corr];
        inventario[email] = inventario[corr];
        delete users[corr];
        delete inventario[corr];
        sessionStorage.setItem("correo", email);
      }
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("inventario", JSON.stringify(inventario));
      alert("Datos actualizados");

      console.log(users);

      document.getElementById("name").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pais").value = "";
      document.getElementById("ciudad").value = "";
      document.getElementById("telefono").value = "";
      document.getElementById("direccion").value = "";
      document.getElementById("postal").value = "";
      document.getElementById("postal").value = "";
      document.getElementById("fPerfil").value = "";
      location.reload();
    }
  }
}
