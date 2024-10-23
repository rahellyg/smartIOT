document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error messages
    document.getElementById('nameError').textContent = "";
    document.getElementById('birthDateError').textContent = "";
    document.getElementById('emailError').textContent = "";
    document.getElementById('passwordError').textContent = "";
    document.getElementById('successMessage').textContent = "";

    // Get input values
    const name = document.getElementById('register-name').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    // Validate fields
    let isValid = true;

    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'שדה זה אינו יכול להיות ריק';
        isValid = false;
    }

    // Validate birth date
    if (birthDate === '') {
        document.getElementById('birthDateError').textContent = 'שדה זה אינו יכול להיות ריק';
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'נא הכנס אימייל תקני';
        isValid = false;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'הסיסמה חייבת להיות לפחות 6 תווים';
        isValid = false;
    }

    // If all fields are valid, show success message
    if (isValid) {
        document.getElementById('successMessage').textContent = 'ההרשמה הושלמה בהצלחה!';
        // Here you could also send the data to a server
    }

    fetch("http://localhost:3000/register", {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, birthDate, email,password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('message').textContent = data;
            document.getElementById('registrationForm').reset();
        })
        .catch(error => {
            document.getElementById('message').textContent = error.message;
        });
});

