function validatePassword(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const message = document.getElementById('password-error');

    if (password.length < 6) {
        message.style.display = "block"
        message.textContent = 'Password must be at least 6 characters long';
    }

    if (password === confirmPassword) {
        message.textContent = 'Passwords match!';
        message.style.color = 'green';
        return true;
    } else {
        message.textContent = 'Passwords do not match.';
        message.style.color = 'red';
        event.preventDefault();
        return false;
    }
}

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    // console.log(email, password);

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

}); 


