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
        let metodo = localStorage.getItem("pago")
        let opcion = localStorage.getItem("tipo")
        let total = localStorage.getItem("totalPagar")
        console.log(articulos)
        let message = `Hola! Mi nombre es ${nombre}. `

        for (let articulo of articulos[0].articles){
           message += `Confirmé la compra de ${articulo.count} unidades de ${articulo.name}.\n`
        }
        message += `\n`
        message +=`-Por un total de: $${total}.\n`
        message += `-Mi preferencia de retiro es: ${opcion}.\n`;
        message += `-Mi preferencia de pago es: ${metodo}.\n`;
        message += `\n`
        message += `Espero su confirmación, muchas gracias!`
        messageArea.value= message
    } else if (localStorage.getItem("nombre")&&localStorage.getItem("cart")&&localStorage.getItem("calle")){
        let nombre = localStorage.getItem("nombre");
        let articulos = JSON.parse(localStorage.getItem("cart"))
        let metodo = localStorage.getItem("pago")
        let opcion = localStorage.getItem("tipo")
        let total = localStorage.getItem("totalPagar")
        let calle = localStorage.getItem("calle", calle)
        let esq = localStorage.getItem("esq", esq)
        let numero =  localStorage.getItem("numero", numero)
        let messageArea = document.getElementById('message');

        let message = `Hola! Mi nombre es ${nombre}. `
for (let articulo of articulos[0].articles){
           message += `Confirmé la compra de ${articulo.count} unidades de ${articulo.name}.\n`
        }
        message += `\n`
        message +=`-Por un total de: $${total}.\n`
        message += `-Mi preferencia de retiro es: ${opcion}.\n`;

message +=`-Mi dirección es: ${calle} ${numero}, esquina ${esq}.\n`;
message += `-Mi preferencia de pago es: ${metodo}.\n`;
        message += `\n`
        message += `Espero su confirmación, muchas gracias!`
        messageArea.value= message
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
