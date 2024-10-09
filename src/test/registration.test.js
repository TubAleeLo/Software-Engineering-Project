// npx mocha ./src/test/registration.test.js
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Read HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../src/register.html'), 'utf8');

// Set up JSDOM and expose document and window globals
const { window } = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.window = window;
global.document = window.document;

// Import your validation functions
import { validateEmail, validatePassword } from '../src/register.js';

describe('Registration Form Validation', () => {
  beforeEach(() => {
    // Set up initial DOM state if needed
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm-password').value = '';
    document.getElementById('reg-email').value = '';
  });

  it('should validate email format correctly', () => {
    const emailInput = document.getElementById('reg-email');
    const emailError = document.getElementById('email-error');

    // Set invalid email
    emailInput.value = 'invalid-email';
    validateEmail();
    expect(emailError.textContent).to.equal('Please enter a valid email address');

    // Set valid email
    emailInput.value = 'test@example.com';
    validateEmail();
    expect(emailError.textContent).to.equal('');
  });

  it('should validate password format correctly', () => {
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const passwordError = document.getElementById('password-error');

    // Set an invalid password
    passwordInput.value = '123';
    confirmPasswordInput.value = '123';
    validatePassword();
    expect(passwordError.textContent).to.equal('Password must 6 characters long, contain a letter, a number, and special character');

    // Set valid password but non-matching confirm password
    passwordInput.value = 'Test@123';
    confirmPasswordInput.value = 'Test@124';
    validatePassword();
    expect(passwordError.textContent).to.equal('Passwords do not match.');

    // Set matching valid password
    passwordInput.value = 'Test@123';
    confirmPasswordInput.value = 'Test@123';
    validatePassword();
    expect(passwordError.textContent).to.equal('Passwords match!');
  });

  it('should prevent form submission if validation fails', () => {
    const signupForm = document.getElementById('reg-signup-form');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');

    // Set invalid email and password
    emailInput.value = 'invalid-email';
    passwordInput.value = '123';
    confirmPasswordInput.value = '123';

    const event = new window.Event('submit', { bubbles: true, cancelable: true });
    signupForm.dispatchEvent(event);

    // Check if form submission was prevented
    expect(event.defaultPrevented).to.be.true;
  });
});
