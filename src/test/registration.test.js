// test/registration-validation.test.js
// 
const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read your HTML file (assuming it's named register.html)
const html = fs.readFileSync(path.resolve(__dirname, '../src/register.html'), 'utf8');

// Set up JSDOM and expose document and window globals
const { window } = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.window = window;
global.document = window.document;

// Import your validation functions
const { validateEmail, validatePassword } = require('../src/register.js'); // Adjust the path as needed

describe('Registration Form Validation', () => {
  it('should validate email format correctly', () => {
    const emailInput = document.createElement('input');
    emailInput.setAttribute('id', 'reg-email');
    emailInput.value = 'test@example.com';
    document.body.appendChild(emailInput);

    const result = validateEmail(emailInput.value);
    expect(result).to.be.true;

    document.body.removeChild(emailInput); // Clean up
  });

  it('should validate password format correctly', () => {
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('id', 'reg-password');
    passwordInput.value = 'password123';
    document.body.appendChild(passwordInput);

    const result = validatePassword(passwordInput.value);
    expect(result).to.be.true;

    document.body.removeChild(passwordInput); // Clean up
  });

  it('should prevent form submission if validation fails', () => {
    const emailInput = document.createElement('input');
    emailInput.setAttribute('id', 'reg-email');
    emailInput.value = 'invalid-email';
    document.body.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('id', 'reg-password');
    passwordInput.value = '123';
    document.body.appendChild(passwordInput);

    const emailValid = validateEmail(emailInput.value);
    const passwordValid = validatePassword(passwordInput.value);

    expect(emailValid && passwordValid).to.be.false;

    document.body.removeChild(emailInput); // Clean up
    document.body.removeChild(passwordInput); // Clean up
  });

  // Add more tests as needed
});
