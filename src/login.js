
// Logout function, TODO: apply to an actual signout interface,i.e. give a button id logout
// const logout = document.getElementById('logout')
// logout.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut();
//     auth.signOut.then(() => {
//         console.log('User signed out');
//     })
// });


document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('User logged in:', userCredential.user.email);
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