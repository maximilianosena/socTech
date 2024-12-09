function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipod|android|windows phone|blackberry|iemobile|opera mini/.test(userAgent);
}

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');


    if (name.trim()!="" && email.trim()!="" && message.trim()!="") {
        
        let mailtoLink = '';


        if (isMobile()) {
            if (email.includes('@gmail')) {
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Redireccionando a Gmail...';
                responseMessage.style.color = 'green';
                
                mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=soctech@soctech-uy.com.com&su=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            } else if (email.includes('@outlook')) {
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Redireccionando a Outlook...';
                responseMessage.style.color = 'green';
                
                mailtoLink = `https://outlook.live.com/mail/0/deeplink/compose?to=soctech@soctech-uy.com.com&subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            } else {
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Correo desconocido, seleccione su proveedor.';
                responseMessage.style.color = 'yellow';
                
                mailtoLink = `mailto:soctech@soctech-uy.com.com?subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            }
        } else {

            
        if (email.includes('@gmail')) {
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Redireccionando a su correo.';
            responseMessage.style.color = 'green';
            mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=soctech@soctech-uy.com.com&su=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
        } else if (email.includes('@outlook')) {
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Redireccionando a su correo.';
            responseMessage.style.color = 'green';
            mailtoLink = `https://outlook.live.com/mail/0/deeplink/compose?to=soctech@soctech-uy.com.com&subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
        } else {
           
            mailtoLink = `mailto:soctech@soctech-uy.com.com?subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Correo desconocido, seleccione su proveedor.';
            responseMessage.style.color = 'yellow';
        }
    }

        
        window.location.href = mailtoLink;

    } else {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'Por favor, complete todos los campos.';
        responseMessage.style.color = 'red';
    }
});



