document.getElementById('messageForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('https://api.soctech-uy.com/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Mensaje enviado con éxito.';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Error al enviar el mensaje.';
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
