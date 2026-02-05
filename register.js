
/**
 * =================================================================
 * REGISTER.JS: Client-Side Form Validation and Responsive Adjustment
 * =================================================================
 */

// Utility function to display messages (Success or Error)
function displayMessage(type, content) {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = content;
    messageArea.className = 'message-area'; // Reset classes
    messageArea.classList.add(type);
}

// Function to validate the registration form upon submission
function validateRegistration(event) {
    // Prevent the page from reloading/submitting traditionally
    event.preventDefault();

    // Get input elements by their IDs (must match the HTML IDs)
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Get trimmed values
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Clear previous messages
    displayMessage('', '');

    // 1. Check if all required fields are filled
    if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
        displayMessage('error', 'All fields are required.');
        return false;
    }
    
    // 2. Basic Email Format Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayMessage('error', 'Please enter a valid email address.');
        emailInput.focus();
        return false;
    }

    // 3. Password Length Check
    if (password.length < 8) {
        displayMessage('error', 'Password must be at least 8 characters long.');
        passwordInput.focus();
        return false;
    }

    // 4. Password Match Check
    if (password !== confirmPassword) {
        displayMessage('error', 'Password and Confirm Password must match.');
        confirmPasswordInput.focus();
        return false;
    }

    // --- Successful Validation ---
    
    displayMessage('success', 'Registration successful! Creating your Stationery Hub account...');

    // In a real application, you would use fetch() or AJAX to send the data to a server here.
    
    // For demonstration, we simulate successful submission and delay before redirecting
    setTimeout(() => {
        // Clear inputs (or redirect)
        fullNameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        
        displayMessage('success', 'Account created! Redirecting to login...');
        
        // Uncomment to automatically redirect to the login page after success:
        // window.location.href = 'index.html'; 

    }, 1500);

    return true;
}


/**
 * =================================================================
 * Responsive/Size Adjustment Handler 
 * (Ensures layout stability, especially on mobile keyboard pop-up)
 * =================================================================
 */

function handleResize() {
    // This script complements the CSS by ensuring the body height 
    // is set accurately, preventing scroll issues on mobile devices.
    if (window.innerWidth <= 768) {
        document.body.style.height = window.innerHeight + 'px';
    } else {
        document.body.style.height = '100vh';
    }
}

// Attach the validation function and resize handlers when the document loads
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegistration);
    }
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Run once on load
    handleResize();
});

