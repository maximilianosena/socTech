function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipod|android|windows phone|blackberry|iemobile|opera mini/.test(userAgent);
}

function isAndroid() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
   
    return /android/i.test(userAgent)
     
}

function isIos() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPad|iPod/i.test(userAgent);
    }

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');


    if (name.trim()!="" && email.trim()!="" && message.trim()!="") {
        
        let mailtoLink = '';


        if (isMobile() && isAndroid()) {
            if (email.includes('@gmail')) {
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Redireccionando a Gmail...';
                responseMessage.style.color = 'green';
                
                let gmailLink = `intent://send?to=soctech@soctech-uy.com&subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}#Intent;scheme=mailto;package=com.google.android.gm;end`
                window.location.href = gmailLink;
            } else if (email.includes('@outlook')) {
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Redireccionando a Outlook...';
                responseMessage.style.color = 'green';
                
                let outlookLink = `intent://send?to=soctech@soctech-uy.com&subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}#Intent;scheme=mailto;package=com.microsoft.office.outlook;end`;
                window.location.href = outlookLink;
            } else {
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Correo desconocido, seleccione su proveedor.';
                responseMessage.style.color = 'yellow';
                
                mailtoLink = `mailto:soctech@soctech-uy.com?subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            }
        } else if (isMobile() && isIos()){

            
        if (email.includes('@gmail')) {
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Redireccionando a su correo.';
            responseMessage.style.color = 'green';
           let gmailIOSLink = `googlegmail://co?to=soctech@soctech-uy.com&subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
           window.location.href = gmailIOSLink;
        } else if (email.includes('@outlook')) {
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Redireccionando a su correo.';
            responseMessage.style.color = 'green';
            let outlookIosLink = `mailto:soctech@soctech-uy.com?subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            window.location.href = outlookIosLink;
        } else {
            mailtoLink = `mailto:soctech@soctech-uy.com?subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Correo desconocido, seleccione su proveedor.';
            responseMessage.style.color = 'yellow';
        }
    } else if (!isMobile()) {
        if (email.includes('@gmail')) {
            let link =  mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=soctech@soctech-uy.com&su=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`;
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Redireccionando a su correo.';
            responseMessage.style.color = 'green';
            window.location.href = link
            window.location.href = mailtoLink;}
            else if (email.includes('@outlook')){
                let mailtoLink = `https://outlook.live.com/mail/0/deeplink/compose?to=soctech@soctech-uy.com&subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Redireccionando a su correo.';
                responseMessage.style.color = 'green';
                window.location.href = mailtoLink
            } else {
                let link = `mailto:soctech@soctech-uy.com?subject=Consulta de ${encodeURIComponent(name)}&body=Has recibido un mensaje de ${encodeURIComponent(name)} (${encodeURIComponent(email)}):%0D%0A%0D%0A${encodeURIComponent(message)}`
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Correo desconocido, seleccione su proveedor.';
                responseMessage.style.color = 'yellow';
                window.location.href = link;
            }

    } else {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'Por favor, complete todos los campos.';
        responseMessage.style.color = 'red';
    }
}});



