document.addEventListener('DOMContentLoaded', async () => {
    await initializeFirebase(); // Ensure Firebase is initialized

    const signupForm = document.getElementById('reg-signup-form');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Real-time Validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePassword);

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.color = 'red';
            return false;
        }

        emailError.textContent = '';
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            passwordError.textContent = 'Password must be at least 6 characters, contain a letter, a number, and a special character.';
            passwordError.style.color = 'red';
            return false;
        }

        if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match.';
            passwordError.style.color = 'red';
            return false;
        }

        passwordError.textContent = 'Passwords match!';
        passwordError.style.color = 'green';
        return true;
    }

    // Form Submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        if (validateEmail() && validatePassword()) {
            try {
                const cred = await auth.createUserWithEmailAndPassword(email, password);
                console.log('User created:', cred.user);

                // Redirect to user home page after successful signup
                window.location.href = './userHomePage.html';
            } catch (error) {
                console.error('Error signing up:', error);
                alert(`Error: ${error.message}`);
            }
        }
    });
});
