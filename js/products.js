let container = document.getElementById("lista");
let products = [];
let addClass


function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}


function showProducts(array) {


  for (let product of array) {
    let contenido = `<div class="container_product" onclick="setProductID(${product.id})" style="cursor:pointer;">
      <div class="container_animado">
        <img src="${product.image}" height="300">
        <span class="texto-hover">${product.name}
          <p>${product.currency} ${product.cost}</p>
        </span>
      </div>
      <span class="description">${product.description}</span>
    </div>`


  container.innerHTML += contenido;
}
}

    




//Buscador de categorias
const categories = localStorage.getItem("catID")===null?"101":localStorage.getItem("catID")


console.log(" Numero de categoria: " + categories)

let url = `https://api.soctech-uy.com/categoria/${categories}`

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
    products = data.products
    showProducts(products);
  })




// Código de Filtros

let btn_increase = document.getElementById("sortAsc")
let btn_decrease = document.getElementById("sortDesc")
let btn_filter = document.getElementById("rangeFilterCount");
let btn_clear = document.getElementById("clearRangeFilter");

btn_increase.addEventListener("click", function () {
  container.innerHTML = "";

  let increase = products.sort((a, b) => {
    return a.cost - b.cost
  })
  console.log(increase)
  
  showProducts(increase)
})


btn_decrease.addEventListener("click", function () {
  container.innerHTML = "";

  let decrease = products.sort((a, b) => {
    return b.cost - a.cost
  })
  console.log(decrease)
  showProducts(decrease)
})


//Código buscador

let search = document.getElementById("search-input");


function searching(products) {
  container.innerHTML = "";

  const filter = products.filter(producto => producto.name.toLowerCase().includes(search.value.toLowerCase()) ||
    producto.description.toLowerCase().includes(search.value.toLowerCase()));


  if (filter.length === 0) {
    container.innerHTML = "No hay resultado"
  } else {

    showProducts(filter)
  }
}


search.addEventListener('input', function () {
  searching(products);
});

//Codigo filtrado por precio


let price_min = document.getElementById("rangeFilterCountMin");
let price_max = document.getElementById("rangeFilterCountMax");


btn_filter.addEventListener("click", function () {
  container.innerHTML = "";

  let tproducts = products;
  let minValue = parseInt(price_min.value);
  let maxValue = parseInt(price_max.value);

  if (!isNaN(minValue) && !isNaN(maxValue)) {
    let filterArray = tproducts.filter((product) => (product.cost >= minValue && product.cost <= maxValue));
    console.log(filterArray);
    showProducts(filterArray);
  } else if (isNaN(minValue) && !isNaN(maxValue)) {
    let filterArray = tproducts.filter((product) => (product.cost <= maxValue));
    showProducts(filterArray);
  } else if (!isNaN(minValue) && isNaN(maxValue)) {
    let filterArray = tproducts.filter((product) => (product.cost >= minValue));
    showProducts(filterArray);
  } else {
    showProducts(tproducts);
  }

}
);

btn_clear.addEventListener("click", function () {
  console.log(btn_clear)
  price_min.value = "";
  price_max.value = "";

  container.innerHTML = "";
  showProducts(products);
});
