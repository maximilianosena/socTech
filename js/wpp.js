    const companyPhone = '59894510882';

window.onload=()=>{
    if (localStorage.getItem("consulta")&&!localStorage.getItem("cart")) {
        let message = document.getElementById('message');
        let consulta = localStorage.getItem("consulta");
        message.value = `Hola! Quería consultar acerca de ${consulta}.`;
    } else if (localStorage.getItem("nombre")&&localStorage.getItem("cart")&&!localStorage.getItem("calle")){
        let messageArea = document.getElementById('message');
        let nombre = localStorage.getItem("nombre");
        let articulos = JSON.parse(localStorage.getItem("cart"))
        
        console.log(articulos)
        let message = `Hola! Mi nombre es ${nombre}. Confirmé la compra de `

        for (let articulo of articulos[0].articles){
           message += ` ${articulo.count} unidades de ${articulo.name} 
            `
        }
let opcion = JSON.parse(localStorage.getItem("opcion"))
        message += `Mi preferencia de retiro es ${opcion}`;

        messageArea.value= message
    } else if (localStorage.getItem("nombre")&&localStorage.getItem("cart")&&localStorage.getItem("calle")){

    }
    else {
        message.value = message.value.trim()
    }
}

document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let message = document.getElementById('message');
        let whatsappMessage = `${encodeURIComponent(message.value)}`
    const whatsappUrl = `https://wa.me/${companyPhone}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    localStorage.clear()
});
