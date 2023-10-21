document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Voer hier je validatie uit (bijvoorbeeld controleren op geldige e-mail)

    // Als de validatie geslaagd is, stuur het formulier naar SendGrid
    sendEmail(name, email, message);
});

function sendEmail(name, email, message) {
    fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
            "Authorization": "Bearer YOUR_SENDGRID_API_KEY",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: "jouw-email@example.com" }],
                subject: "Nieuw contactformulierbericht",
            }],
            from: { email: email },
            content: [{ type: "text/plain", value: message }],
        }),
    })
    .then(response => {
        if (response.status === 202) {
            // E-mail is succesvol verstuurd
            console.log("E-mail verzonden");
        } else {
            // E-mailverzending is mislukt
            console.error("Fout bij verzenden van e-mail");
        }
    })
    .catch(error => {
        // Toon een foutmelding als er iets misgaat
        console.error("Error:", error);
    });
}
