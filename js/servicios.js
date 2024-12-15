let container = document.getElementById("contenedor_servicios")

let contenedor_software = document.getElementById("contenedor_software")
localStorage.clear()

let lista = [{
    name:"Cambio de Pantalla",
    image:"/imgs/pantalla.jpg",
    id:"01"
},
{
    name:"Cambio de Batería",
    image:"/imgs/cel3.jpeg",
    id:"02"
},{
    name:"Cambio de Cámara",
    image:"/imgs/camara.jpg",
    id:"03"
},{
    name:"Cambio de Puerto de carga",
    image:"/imgs/usb.jpg",
    id:"04"
},{
    name:"Cambio de Altavoces/Micrófono",
    image:"/imgs/altavoz.webp",
    id:"05"
}
]

let software = [{
    name:"Desbloqueo de Celular",
    image:"/imgs/bloqueado.webp",
    id:"01s"
},
{
    name:"Problemas de conexión",
    image:"/imgs/noWifi.jpg",
    id:"02s"
},
{
    name:"Celular lento",
    image:"/imgs/lento.jpg",
    id:"03s"
},{
    name:"Celular no Inicia",
    image:"/imgs/noInicia.webp",
    id:"04s"
}
]
function add_Elements (array) {
    
    for (let i=0; i<array.length; i++) {
        (container ? container : contenedor_software).innerHTML+=`<div class="col">
          <div class="card h-100">
            <img src="${array[i].image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${array[i].name}</h5>
              <button type="button" class="btn btn-info consultar" onclick="guardarConsulta('${array[i].name}')" id="${array[i].id}"> Consultar </button>
            </div>
          </div>
        </div>`
    }
}

function guardarConsulta (nombre){
    localStorage.setItem("consulta", nombre)
    console.log(localStorage.getItem("consulta"))

    window.location.href="whatsapp.html"
}


if (container){
add_Elements(lista)
} else {
add_Elements(software)
}