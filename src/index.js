import './styles/style.css'
// Initialize a counter variable
let count = 0;

// Get references to the button and counter display
const button = document.getElementById("times-clicked-button");

// Add an event listener to the button for the 'click' event
button.addEventListener("click", () => {
    // Increment the counter
    count++;

    // Update the counter display
    button.textContent = 'Times Clicked: ' + count;
});
