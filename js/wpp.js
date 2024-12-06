    const companyPhone = '59894510882';

window.onload=()=>{
    if (localStorage.getItem("nombre")) {
        let message = document.getElementById('message');
        let consulta = localStorage.getItem("nombre");
        message.value = `Hola! Quería consultar acerca de ${consulta}.`;
    } else {
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
