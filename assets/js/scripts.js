
window.onload = function(){
    let users = JSON.parse(localStorage.getItem("users")) || {};
}
function auth(){
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('password');
    let users = JSON.parse(localStorage.getItem("users")) || {};
    
    
    if (users[email]){
        let user = users[email]
        if (user.password == password.value) {
            alert("Bienvenido a inventario");
            sessionStorage.setItem("auth", true)
            sessionStorage.setItem("correo", email)
            window.location = "../other/home.html"
        } else {
          alert("Datos incorrectos");
        }
    }
    else{
        alert("Este Correo no existe");
    }
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    console.log(users)
}


function register(){
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value;
    let pais = document.getElementById('pais').value;
    let ciudad = document.getElementById('ciudad').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccion').value;
    let postal = document.getElementById('postal').value;
    let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
    email.innerHTML = "";
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if(users[email]){
        alert("Este Correo ya se encuentra registrado, Inicia sesion");
        window.location = "../index.html"
    }
    else if (!email || !password || !name || !lastname || !pais ||!ciudad ||!telefono ||!direccion ||!postal){
        alert("Rellene todos los campos");
    }
    else
    {
        inventario[email] = {}
        localStorage.setItem("inventario", JSON.stringify(inventario));
        users[email] = {"name": name, "lastname":lastname, "password": password, "pais": pais, "ciudad": ciudad, "telefono": telefono, "direccion": direccion, "postal": postal}
        localStorage.setItem("users", JSON.stringify(users));
        alert("Usuario creado satisfactoriamente")
        window.location = "../index.html"
    }
    console.log(users)
     
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pais").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("postal").value = "";
}

