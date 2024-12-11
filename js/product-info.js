

const product = localStorage.getItem("productID")




//Mostrar producto
let title = document.getElementById("title")
let things = document.getElementById("showP")
let firstImage = document.getElementById("firstImage")
let restImages = document.getElementById("restImages")
let showImages = document.getElementById("showImages")

function showTheProduct(object) {
    console.log(object[0].images)
    title.innerHTML += `
    <div class="h1 text-center" id="titleProduct">
    ${object[0].name} 
    </div>
    `

    firstImage.innerHTML += `<div class="carousel-item active"><img src=${object[0].images[0]} class="d-block w-100" alt="..."></div>`

    for (let i = 1; i < object[0].images.length; i++) {
        firstImage.innerHTML += `<div class="carousel-item"><img src=${object[0].images[i]} class="d-block w-100" alt="..."></div>`
    }

    things.innerHTML += `
    <div class=product-info>
    <div id="priceProduct">
    ${object[0].currency}${object[0].cost} 
    </div>
    <div id="descriptionProduct">
    Descripción:${object[0].description} 
    </div>
    `
    things.innerHTML += `<h5>Productos Relacionados:</h5>`
    for (let product of object[0].relatedProducts) {
        things.innerHTML += `<div class=related-product onclick="setProductID(${product.id})" style="cursor:pointer;">${product.name} <img src=${product.image} height=150px></div>`
    }
}



let urlProduct = 'js/' + product + '.json'
async function showproduct() {
    let response = await fetch(urlProduct);
    if (response.ok) {
        let responseContents = await response.json();
        console.log(responseContents);
        showTheProduct(responseContents);
    } else {
        console.log("Error: " + response.status)
    }
}

showproduct()

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = 'product-info.html'
}








///////////////////////////////////////////////////////////////////
btn_add = document.getElementById("addCart")

let products_Cart = JSON.parse(localStorage.getItem("cart")) || []
console.log(products_Cart)


let nameUser = localStorage.getItem("storedEmail")

function addProduct(cart_product) {

    let newProduct = {
        "user": nameUser,
        "articles": [
            {
                "id": cart_product.id,
                "name": cart_product.name,
                "count": 1,
                "unitCost": cart_product.cost,
                "currency": cart_product.currency,
                "image": cart_product.images[0]
            }
        ]
    }
    products_Cart.push(newProduct)
}

async function productToTheCart() {
    let response = await fetch(urlProduct);
    if (response.ok) {
        let responseContents = await response.json();
        console.log(responseContents);
        addProduct(responseContents);
    } else {
        console.log("Error: " + response.status)
    }
}



function jsonCart() {
    localStorage.setItem("cart", JSON.stringify(products_Cart))
}

btn_add.addEventListener("click", () => {
    btn_add.disabled = true; // Desactivar el botón

    productToTheCart()
        .then(() => {
            jsonCart();
            mostrarToast();
            audioEtiqueta.setAttribute("src", "audio/tono-mensaje-.mp3")
            audioEtiqueta.play()
            console.log(`Reproduciendo: ${audioEtiqueta.src}`)
            btn_add.disabled = false; // Volver a habilitar el botón después de agregar el producto
        })
        .catch((error) => {
            console.error("Error: " + error);
            btn_add.disabled = false; // Volver a habilitar el botón en caso de error
        });
})

function mostrarToast() {
    var miToast = document.getElementById('miToast');
    var cartel = new bootstrap.Toast(miToast);
    cartel.show();
}

let audioEtiqueta = document.querySelector("audio")