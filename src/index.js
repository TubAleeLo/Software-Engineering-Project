const navToRegister = () => {
    try {
        window.location.href = "./registerTest.html";
    } catch (error) {
        console.error("Navigation error:", error.message);
    }
}