let container = document.getElementById("contenedor_servicios")

let contenedor_software = document.getElementById("contenedor_software")

let lista = [{
    name:"Cambio de Pantalla",
    image:"/socTech/imgs/pantalla.jpg",
    id:"01"
},
{
    name:"Cambio de Batería",
    image:"/socTech/imgs/cel3.jpeg",
    id:"02"
},{
    name:"Cambio de Cámara",
    image:"/socTech/imgs/camara.jpg",
    id:"03"
},{
    name:"Cambio de Puerto de carga",
    image:"/socTech/imgs/usb.jpg",
    id:"04"
},{
    name:"Cambio de Altavoces/Micrófono",
    image:"/socTech/imgs/altavoz.webp",
    id:"05"
}
]

let software = [{
    name:"Desbloqueo de Celular",
    image:"/socTech/imgs/bloqueado.webp",
    id:"01s"
},
{
    name:"Problemas de conexión",
    image:"/socTech/imgs/noWifi.jpg",
    id:"02s"
},
{
    name:"Celular lento",
    image:"/socTech/imgs/lento.jpg",
    id:"03s"
},{
    name:"Celular no Inicia",
    image:"/socTech/imgs/noInicia.webp",
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
              <button type="button" class="btn btn-info consultar" id="${array[i].id}">Consultar</button>
            </div>
          </div>
        </div>`
    }
}



if (container){
add_Elements(lista)
} else {
add_Elements(software)
}