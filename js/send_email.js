document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let to = "rahelly23@gmail.com"
    let subject = "you got message from " + document.getElementById("name").value   
    let text = " phone number " + document.getElementById("phone").value + " email adress " + document.getElementById("email").value + " message " + document.getElementById("message").value
    fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ to, subject, text })
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});