function validatePassword(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const message = document.getElementById('message');

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
