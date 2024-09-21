function validatePassword(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const message = document.getElementById('password-error');
    
    // Reset error messages
    message.classList.add('visible');

    // Password should contain at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        message.textContent = 'Password must 6 characters long and contain at least one letter, number, and special character';
        event.preventDefault();
        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match.';
        return false;
    }

    message.textContent = 'Passwords match!';
    message.style.color = 'green';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the email is valid
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.visibility = 'visible';  // Ensure the message is visible
        return false;
    } else {
        emailError.textContent = ''; // Clear error message
        emailError.style.visibility = 'hidden'; // Hide when valid
        return true;
    }
}

// Real-time validation as user types
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm-password').addEventListener('input', validatePassword);


const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    
    if (validateEmail() && validatePassword()) {
        // User Creation 
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            const user = cred.user;
            window.location.href = "index.html"; // TODO: change to main application page, after it is made ofc 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing up:", errorCode, errorMessage);
            // Handle error messages here
        });

        signupForm.reset();
    }
}); 


