//Mostrar Productos
let tableBody = document.getElementById("tableBody");
let totalElement = document.getElementById("total");
let list = [];

console.log("lista", list)
let ID = 25801;
let urlProduct = 'https://japceibal.github.io/emercado-api/user_cart/' + ID + '.json';

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
    containerSubtotal.innerHTML = ` USD 0`
    containerTax.innerHTML = ` USD 0`
    totalFinal.textContent = ` USD 0`
  } else {
    for (let i = 0; i < allSubtotal.length; i++) {
      if (allSubtotal[i].textContent.includes("USD")) {
        resultado += parseFloat(allSubtotal[i].childNodes[1].textContent)
      }
      else {
        //Si el valor no está en dolares, se convierte 
        resultado += parseFloat(allSubtotal[i].childNodes[1].textContent) / usd
      }
    }
    containerSubtotal.innerHTML = ` USD ${resultado.toFixed(2)}`

    valueTax(resultado)
    let taxNumber = parseFloat(containerTax.innerHTML.replace("USD ", ""))
    console.log(taxNumber)
    final(resultado, taxNumber)
  }
}

//Selección tipo de envío
let shipping = document.getElementsByName("shipping_option")
let containerTax = document.getElementById("shipType")
let containerSubtotal = document.getElementById("subAll")


console.log(shipping)


for (let input of shipping) {
  console.log("Este es un input", input.value)
}

function valueTax(resultadoSubtotal) {
  let selectedOption;

  //Recorrido que se detiene al encontrar el valor seleccionado
  for (let i = 0; i < shipping.length; i++) {
    if (shipping[i].checked) {
      selectedOption = shipping[i].value;
      break;
    }
  }
  let subtotalNumber = parseFloat(containerSubtotal.textContent.replace("USD ", ""))
  console.log(subtotalNumber)

  if (selectedOption === "premium") {
    let tax = resultadoSubtotal * 0.15
    containerTax.innerHTML = ` USD ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }
  else if (selectedOption === "express") {
    let tax = resultadoSubtotal * 0.07
    containerTax.innerHTML = ` USD ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }
  else if (selectedOption === "standard") {
    let tax = resultadoSubtotal * 0.05
    containerTax.innerHTML = ` USD ${tax.toFixed(2)}`
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
  totalFinal.textContent = ` USD ${result.toFixed(2)}`
  console.log(result)
}

// Forma de Pago
function openModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Asignar evento al enlace para abrir el modal
document.getElementById("openModalLink").addEventListener("click", openModal);


//funcion forma de pago
let option1 = document.getElementById("credit_card_option");
let option2 = document.getElementById("bank_transfer_option");
let btn_Modal = document.getElementById("openModalLink")
let cardpass = document.getElementById("validationCustom06");
let securityCard = document.getElementById("validationCustom07")
let expiryDay = document.getElementById("validationCustom08")
let bankpass = document.getElementById("validationCustom09");
let selectedPaymentMethod = document.getElementById("selectedPaymentMethod");
let spanHidden = document.getElementById("hiddenSpan")
let inputsFormCreditCard = document.querySelectorAll("#creditCardFields .form-control")

option1.addEventListener("click", () => {
  if (option1.checked) {
    selectedPaymentMethod.innerHTML = ` Tarjeta de crédito`;

    bankpass.disabled = true
    cardpass.disabled = false;
    securityCard.disabled = false;
    expiryDay.disabled = false;

    if (cardpass.getAttribute("required") === null) {
      cardpass.setAttribute("required", "required")
      cardpass.setAttribute("pattern", "^[0-9]+$")

      securityCard.setAttribute("required", "required")
      securityCard.setAttribute("pattern", "^[0-9]+$")
      expiryDay.setAttribute("required", "required")
      expiryDay.setAttribute("pattern", "^(0[1-9]|1[0-2])\/[0-9]{2}$")
    }


    bankpass.removeAttribute("required");
    bankpass.removeAttribute("pattern")

    if (bankpass.value.trim() !== "") {
      bankpass.value = ""
    }

    if (bankpass?.classList.contains("is-invalid")) {
      bankpass?.classList.remove("is-invalid")
    }
    if (bankpass?.classList.contains("is-valid")) {
      bankpass?.classList.remove("is-valid")
    }

    if (
      spanHidden.classList.contains("open")) {
      spanHidden.classList.remove("open")
    }

    if (btn_Modal.classList.contains("bg-danger")) {
      btn_Modal.classList.remove("bg-danger")
    }

    expiryDay.addEventListener("input", function () {
      const value = expiryDay.value;
      if (value.length === 2 && !value.includes("/")) {
        expiryDay.value = value + "/";
      }
    })

    inputsFormCreditCard.forEach(inputEmpty => {
      inputEmpty.classList.add("is-invalid")
      inputEmpty.addEventListener("input", () => {
        if (inputEmpty.checkValidity()) {
          inputEmpty.classList.remove("is-invalid")
          inputEmpty.classList.add("is-valid")
        }
      })
    })

    inputsFormCreditCard.forEach(inputEmpty => {
      inputEmpty.addEventListener("input", () => {
        {
          {
            spanHidden.classList.remove("open");
          }
        }
      });
    });

  }
});

option2.addEventListener("click", () => {
  if (option2.checked) {
    selectedPaymentMethod.innerHTML = ` Transferencia bancaria`;

    cardpass.disabled = true;
    securityCard.disabled = true;
    expiryDay.disabled = true;
    bankpass.disabled = false;

    if (bankpass.getAttribute("required") === null) {
      bankpass.setAttribute("required", "required")
      bankpass.setAttribute("pattern", "^[0-9]+$")
    }

    cardpass.removeAttribute("required");
    securityCard.removeAttribute("required");
    expiryDay.removeAttribute("required");

    cardpass.removeAttribute("pattern");
    securityCard.removeAttribute("pattern");
    expiryDay.removeAttribute("pattern");

    if (expiryDay.value.trim() !== "" || securityCard.value.trim() !== "" || cardpass.value.trim() !== "") {
      inputsFormCreditCard.forEach(inputEmpty => {
        inputEmpty.value = ""

      })
    }

    inputsFormCreditCard.forEach(inputEmpty => {
      if (inputEmpty?.classList.contains("is-invalid")) {
        inputEmpty?.classList.remove("is-invalid")
      }
      if (inputEmpty?.classList.contains("is-valid")) {
        inputEmpty?.classList.remove("is-valid")
      }
    })

    if (
      spanHidden.classList.contains("open")) {
      spanHidden.classList.remove("open")
    }

    if (btn_Modal.classList.contains("bg-danger")) {
      btn_Modal.classList.remove("bg-danger")
    }

    bankpass.addEventListener("input", () => {
      if (bankpass.checkValidity) {
        if (spanHidden.classList.contains("open")) {
          spanHidden.classList.remove("open")
        }
      }
    })
    bankpass.classList.add("is-invalid")

    bankpass.addEventListener("input", () => {
      if (bankpass.checkValidity()) {
        bankpass.classList.remove("is-invalid")
        bankpass.classList.add("is-valid")
      }
    })
  }
});


// Modal de exito de compra

let alertTrigger = document.getElementById('liveAlertBtn');
function finalizarCompra() {
  if (cart && cart.length > 0) {
    let comprasExitosas = JSON.parse(localStorage.getItem("compraExitosa")) || [];
    comprasExitosas = comprasExitosas.concat(cart);
    localStorage.setItem("compraExitosa", JSON.stringify(comprasExitosas));

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    alertPlaceholder.style.display = "block"
    appendAlert('Compra exitosa!', 'success')
    setTimeout(function () {
      alertPlaceholder.style.display = "none"
    }, 2000)

    setTimeout(function () {
      location.reload()
    }, 2000)

  }

}

function resetPage() {
  tableBody.innerHTML = '';
  containerSubtotal.innerHTML = ` USD 0`;
  containerTax.innerHTML = ` USD 0`;
  totalFinal.textContent = ` USD 0`;
};

if (cart === null) {
  showproduct()
  location.reload()
} else {
  products_add()
  subTotals()
}


(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      if (cart && cart.length === 0) {
        alertPlaceholder.style.display = "block"
        appendAlert('Agregue un producto al carrito!', 'danger')
        setTimeout(function () {
          alertPlaceholder.style.display = "none"
        }, 2000)
        event.preventDefault()
        event.stopPropagation()
      } else {

        if (!form.checkValidity()) {

          alertPlaceholder.style.display = "block"
          appendAlert('Complete todos los campos!', 'danger')
          if (!option1.checked && !option2.checked) {
            btn_Modal.classList.add("bg-danger")
            spanHidden.classList.add("open")
            inputsFormCreditCard.forEach(inputEmpty => {
              inputEmpty.classList.add("is-invalid")
            })
            bankpass.classList.add("is-invalid")
          }
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