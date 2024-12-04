document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('User logged in:', userCredential.user.email);
        window.location.href = "./userHomePage.html";
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
    }
});

const navToRegister = () => {
    window.location.href = "./register.html"
}

const navToLogin = () => {
    window.location.href = "./login.html"
}