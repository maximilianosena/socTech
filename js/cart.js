//Mostrar Productos
let tableBody = document.getElementById("tableBody");
let totalElement = document.getElementById("total");
let list = [];

console.log("lista", list)

localStorage.removeItem("nombre")
localStorage.removeItem("calle")
localStorage.removeItem("esq")
localStorage.removeItem("numero")
localStorage.removeItem("celular")
localStorage.removeItem("adicional")

let resultadoSubtotal;
/////////////////////////////////////////////////////////////
let cart = JSON.parse(localStorage.getItem("cart"))

console.log(cart)

function products_add() {
  list = []
  // Recorre el carrito original para buscar duplicados
  cart.forEach((product) => {
    const product_Exist = list.find((item) => item.articles[0].id === product.articles[0].id);
    if (product_Exist) {
      // Si se encuentra un duplicado, suma las unidades
      product_Exist.articles[0].count += product.articles[0].count;
    } else {
      list.push(product);
    }
  });
  localStorage.setItem("cart", JSON.stringify(list));
  for (let product of list) {
    showTheProduct(product);
  }
}


/////////////////////////////////////////////////////

async function showproduct() {
  let response = await fetch(urlProduct);
  if (response.ok) {
    let object = await response.json();
    console.log(object);
    localStorage.setItem("cart", JSON.stringify([object]))
    showTheProduct(object);
    subTotals(); //agrego función al fetch para ver al cargar la página
  } else {
    console.log("Error: " + response.status);
  }
}



function showTheProduct(object) {
  tableBody.innerHTML += '';

  for (let i = 0; i < object.articles.length; i++) {
    let product = object.articles[i];

    // Calcula el subtotal en función de la cantidad
    let subtotal = product.unitCost * product.count;

    // Agrega el atributo data-index para identificar la fila
    tableBody.innerHTML += `<tr data-index="${i}"> 
      <td><img src=${product.image} width="50px" ></td>
      <td>${product.name}</td>
      <td>${product.currency} ${product.unitCost}</td>
      <td><input class="prodCount" type="number" value=${product.count} min="1" style="width:70px"></td>
      <td><b>${product.currency} <span class="subtotal">${subtotal}</span></b></td>
      <td><button type="button" class="btn btn-danger" onclick="removeProductCart(${product.id})">X <audio src="audio/trash.mp3" id="audio_trash"></audio></button></td>
      </tr>`;
  }

  // Agrega un evento de cambio a los campos de cantidad
  let prodCountInputs = document.querySelectorAll(".prodCount");

  prodCountInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      let product = list[index].articles;
      let cost = product[0].unitCost
      let newCount = parseInt(event.target.value, 10);

      if (!isNaN(newCount) && newCount >= 1) {

        console.log(cost)

        product[0].count = newCount;

        // Recalcula el subtotal en función de la nueva cantidad
        let newSubtotal = cost * newCount;

        let subtotalElement = event.target.closest("tr").querySelector(".subtotal");
        subtotalElement.innerHTML = parseInt(newSubtotal);

        console.log(subtotalElement)

        let newTotal = 0;
        document.querySelectorAll(".subtotal").forEach((subtotal) => {
          newTotal += parseInt(subtotal.textContent.split(" ")[1]);
        });


        // Actualiza el contenido del elemento "total" con el valor recalculado
        totalElement = product[0].currency + " " + newTotal;

        //Función que se dispara al cambiar la cantidad de inputs
        subTotals()

        localStorage.setItem("cart", JSON.stringify(list));

        tableBody.innerHTML = '';
        for (let product of list) {
          showTheProduct(product);
        }
      }
    });
  });
}


let trashAudio = new Audio('audio/trash.mp3')

function removeProductCart(id) {

  let audio = document.getElementById("audio_trash")
  console.log(audio)

  tableBody.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    if (list[i].articles[0].id === id) {
      // Elimina el primer objeto que coincida con la id
      list.splice(i, 1);
      cart = list;
      break;
    }
  }

  console.log("Nueva lista:", cart);

  localStorage.setItem("cart", JSON.stringify(cart));

  if (audio) {
    trashAudio.play()
    console.log(`Reproduciendo: ${trashAudio}`)
  }

  products_add();
  subTotals();

}





//SUMA TOTAL
let allSubtotal = document.getElementsByTagName("b")
console.log(allSubtotal.length)

let usd = 40;


//Función que devuelve la suma de los subtotales, y actualiza el valor del costo de envío y costo total
function subTotals() {
  let resultado = 0;
  if (allSubtotal.length === 0) {
    console.log("vacío")
    containerSubtotal.innerHTML = ` $ 0`
    containerTax.innerHTML = ` $ 0`
    totalFinal.textContent = ` $ 0`
  } else {
    for (let i = 0; i < allSubtotal.length; i++) {
      if (allSubtotal[i].textContent.includes("$")) {
        resultado += parseFloat(allSubtotal[i].childNodes[1].textContent)
      }
      else {
        //Si el valor no está en dolares, se convierte 
        resultado += parseFloat(allSubtotal[i].childNodes[1].textContent) / usd
      }
    }
    containerSubtotal.innerHTML = ` $ ${resultado.toFixed(2)}`

    valueTax(resultado)
    tipoPago()
    let taxNumber = parseFloat(containerTax.innerHTML.replace(/[^0-9.]/g, ""))
    console.log(taxNumber)
    final(resultado, taxNumber)
  }
}

//Selección tipo de envío
let shipping = document.getElementsByName("shipping_option")
let containerTax = document.getElementById("shipType")
let containerSubtotal = document.getElementById("subAll")


console.log(shipping)

let forma  = document.getElementsByName("form_option")


let calle = document.getElementById("calle")
let numero = document.getElementById("numero")
let esq = document.getElementById("esq")
let adicional = document.getElementById("adicionales")
let celular = document.getElementById("numeroTel")


let input_calle = document.getElementById("validationCustom03")
let input_numero = document.getElementById("validationCustom04")
let input_esq = document.getElementById("validationCustom05")
let input_adicional = document.getElementById("validationCustom06")
let input_celular = document.getElementById("validationCustom01")

function tipoPago() {
  let selectedOption;

  //Recorrido que se detiene al encontrar el valor seleccionado
  for (let i = 0; i < forma.length; i++) {
    if (forma[i].checked) {
      selectedOption = forma[i].value;
      localStorage.setItem("pago", selectedOption);
      break;
    }
  }

  // Agrega los listeners para detectar clicks en las opciones de pago
  for (let i = 0; i < forma.length; i++) {
    forma[i].addEventListener("click", () => {
      console.log("Esta es la forma", forma[i].value);
      localStorage.setItem("pago", forma[i].value);
    });
  }
}



function valueTax(resultadoSubtotal) {
  let selectedOption;
 
  //Recorrido que se detiene al encontrar el valor seleccionado
  for (let i = 0; i < shipping.length; i++) {
    if (shipping[i].checked) {
      selectedOption = shipping[i].value;
      let opcion = localStorage.setItem("tipo", selectedOption)
      break;
    }
  }
  let subtotalNumber = parseFloat(containerSubtotal.textContent.replace(/[^0-9.]/g, ""))
  console.log(subtotalNumber)

  if (selectedOption === "UES") {
    calle.style.display = "block";
    numero.style.display = "block";
    esq.style.display = "block";
    celular.style.display = "block";
    adicional.style.display = "block";
    let tax = 180
    containerTax.innerHTML = `$ ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }
  else if (selectedOption === "DAC") {
    
    calle.style.display = "block";
    numero.style.display = "block";
    esq.style.display = "block";
    celular.style.display = "block";
    adicional.style.display = "block";
      let tax = 213
      containerTax.innerHTML = ` $ ${tax.toFixed(2)}`
      final(subtotalNumber, tax)
    }
  else if (selectedOption === "en Local") {
    
    calle.style.display = "none";
    numero.style.display = "none";
    esq.style.display = "none";
    celular.style.display = "none";
    adicional.style.display = "none";
    let tax = resultadoSubtotal * 0
    containerTax.innerHTML = ` $ ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }

  console.log(selectedOption)
}



//Evento al seleccionar un tipo de envío
for (let i = 0; i < shipping.length; i++) {
  shipping[i].addEventListener("click", () => {
    subTotals()
  })
}


//Función Suma Total

let totalFinal = document.getElementById("totalCart")

function final(subtotalCart, taxCart) {
  let result = 0
  result += subtotalCart + taxCart
  totalFinal.textContent = ` $ ${result.toFixed(2)}`
  console.log(result)
  localStorage.setItem("totalPagar", result)
}





function resetPage() {
  
  tableBody.innerHTML = '';
  containerSubtotal.innerHTML = ` $ 0`;
  containerTax.innerHTML = ` $ 0`;
  totalFinal.textContent = `$ 0`;
};

if (cart === null) {
  console.log("Carro vacio")
  tableBody.innerHTML = '';
  containerSubtotal.innerHTML = ` $ 0`;
  containerTax.innerHTML = ` $ 0`;
  totalFinal.textContent = `$ 0`;
} else {
  products_add()
  subTotals()
}

function finalizarCompra(){

  let inputNombre = document.getElementById("validationCustom02");
if (!inputNombre.checkValidity()) {
  alert("Por favor ingrese un nombre válido");
  return;
}

  let name = document.getElementById("validationCustom02").value
  if( calle.style.display === "none"&&
    numero.style.display === "none"&&
    esq.style.display === "none"){
      localStorage.setItem("nombre", name)
    console.log("Funciona")
    location.replace("whatsapp.html")
    } else {
         localStorage.setItem("nombre", name)
         localStorage.setItem("calle", input_calle.value)
          localStorage.setItem("esq", input_esq.value)
          localStorage.setItem("numero", input_numero.value)
localStorage.setItem("celular", input_celular.value)
localStorage.setItem("adicional", input_adicional.value)
          location.replace("whatsapp.html")
}}


(() => {
  'use strict'

  
  const forms = document.querySelectorAll('.needs-validation')

  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      if (cart && cart.length === 0 || cart == null) {
        alertPlaceholder.style.display = "block"
        appendAlert('Agregue un producto al carrito!', 'danger')
        setTimeout(function () {
          alertPlaceholder.style.display = "none"
        }, 2000)
        event.preventDefault()
        event.stopPropagation()
      } else {

        if( calle.style.display === "none"&&
          numero.style.display === "none"&&
          esq.style.display === "none"){
            finalizarCompra();
            event.preventDefault()
        } 
        
        
        else if (!form.checkValidity()) {
          setTimeout(function () {
            alertPlaceholder.style.display = "none"
          }, 2000)
          event.preventDefault()
          event.stopPropagation()
        } else {
          finalizarCompra();
          event.preventDefault()
        }

        form.classList.add('was-validated')
      }
    }, false)
  })
})()


const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}