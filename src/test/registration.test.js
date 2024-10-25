const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read your HTML file (assuming it's named register.html)
const html = fs.readFileSync(path.resolve(__dirname, '../register.html'), 'utf8');

// Set up JSDOM and expose document and window globals
const { window } = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.window = window;
global.document = window.document;

// Import your validation functions
const { validateEmail, validatePassword } = require('../register.js'); // Adjust the path as needed

describe('Registration Form Validation', () => {
  it('should validate email format correctly', () => {
    const emailInput = document.getElementById('reg-email');
    emailInput.value = 'test@example.com';

    const result = validateEmail();
    expect(result).to.be.true;
  });

  it('should validate password format correctly', () => {
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    passwordInput.value = 'Password123!';
    confirmPasswordInput.value = 'Password123!';

    const result = validatePassword();
    expect(result).to.be.true;
  });

  it('should prevent form submission if validation fails', () => {
    const emailInput = document.getElementById('reg-email');
    emailInput.value = 'invalid-email';

    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    passwordInput.value = '123';
    confirmPasswordInput.value = '123';

    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    expect(emailValid && passwordValid).to.be.false;
  });

  // Add more tests as needed
});
