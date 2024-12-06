document.addEventListener('DOMContentLoaded', async () => {
    await initializeFirebase(); // Ensure Firebase is initialized

    const loginForm = document.getElementById('login-form');

<<<<<<< HEAD
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('User logged in:', userCredential.user.email);

            // Redirect to user home page
            window.location.href = "./userHomePage.html";
        } catch (error) {
            console.error('Error logging in:', error);
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Invalid email or password. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
=======
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('User logged in:', userCredential.user.email);
        window.location.href = "./userHomePage.html";
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
    }
});

document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        await auth.signOut();
        console.log('User logged out');
        window.location.href = "./login.html";
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out: ' + error.message);
    }
});

const navToRegister = () => {
    window.location.href = "./register.html"
}

const navToLogin = () => {
    window.location.href = "./login.html"
}