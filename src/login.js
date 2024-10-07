
// Logout function, TODO: apply to an actual signout interface,i.e. give a button id logout
const logout = document.getElementById('logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    auth.signOut.then(() => {
        console.log('User signed out');
    })
});


const loginForm = document.getElementById(login-form);
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get inputs
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // Sign in user
    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user);
        // window.location.href = "index.html"; // TODO: change to main application page, after it is made ofc !!!
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in:", errorCode, errorMessage);
        // Handle error messages here
    });  
    
});

const navToRegister = () => {
    window.location.href = "./register.html"
}

const navToLogin = () => {
    window.location.href = "./login.html"
}