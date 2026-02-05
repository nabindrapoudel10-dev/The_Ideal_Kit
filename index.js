
/**
 * =================================================================
 * SCRIPT.JS: Client-Side Form Validation and Responsive Adjustment
 * =================================================================
 */

// Function to validate the login form
function validateForm(event) {
    // Prevent the default form submission (so we can handle validation first)
    event.preventDefault();

    // Get form elements
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageArea = document.getElementById('message-area');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset message area
    messageArea.textContent = '';
    messageArea.className = 'message-area';

    // 1. Basic Validation Checks
    if (username === '' || password === '') {
        messageArea.classList.add('error');
        messageArea.textContent = 'Please enter both username and password.';
        
        // Focus on the first empty field
        if (username === '') {
            usernameInput.focus();
        } else {
            passwordInput.focus();
        }
        return false;
    }

    // 2. Minimum Length Check (Example)
    if (username.length < 4) {
        messageArea.classList.add('error');
        messageArea.textContent = 'Username must be at least 4 characters long.';
        usernameInput.focus();
        return false;
    }
    if (password.length < 6) {
        messageArea.classList.add('error');
        messageArea.textContent = 'Password must be at least 6 characters long.';
        passwordInput.focus();
        return false;
    }

    // 3. Successful Validation - Display Success Message
    messageArea.classList.add('success');
    messageArea.textContent = 'Login successful! Redirecting...';

    // In a real application, you would send the data to a server here (e.g., using fetch API)
    // For demonstration, we simulate a successful login and redirect after 1 second.
    setTimeout(() => {
        // You would typically redirect the user here:
        // window.location.href = '/dashboard';
        
        // For now, we clear the form fields and success message for a new login attempt
        usernameInput.value = '';
        passwordInput.value = '';
        messageArea.textContent = 'Welcome back!';
        
    }, 1000);

    return true;
}


/**
 * =================================================================
 * Responsive/Size Adjustment Handler
 * (Optional, but adds robustness on resizing/mobile keyboard pop-ups)
 * =================================================================
 */

// Function to handle minor responsive adjustments on resize
function handleResize() {
    // Find the container element
    const container = document.querySelector('.container');
    
    // Only apply logic for smaller screens where layout is most sensitive
    if (window.innerWidth <= 768) {
        // Set the container's max height to the current viewport height (minus a small buffer)
        // This ensures the container never exceeds the screen when the mobile keyboard pops up.
        const viewportHeight = window.innerHeight;
        // The CSS sets max-height: 98vh, but this JS can adjust it precisely if needed.
        // For simplicity and reliance on CSS, we primarily ensure the body doesn't scroll.
        
        document.body.style.height = viewportHeight + 'px';
    } else {
        // Reset for desktop/larger views
        document.body.style.height = '100vh';
    }
}

// Attach the validation function to the form submission event
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validateForm);
    }
    
    // Attach the resize handler to the window events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Run once on load
    handleResize();
});

