document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const userPhone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const companyPhone = '59895827701'; 

    // Construye el mensaje para WhatsApp
    const whatsappMessage = `Hola, soy ${encodeURIComponent(name)}. 
Mi número de teléfono es ${encodeURIComponent(userPhone)}. 
${encodeURIComponent(message)}`;

    
    const whatsappUrl = `https://wa.me/${companyPhone}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
});