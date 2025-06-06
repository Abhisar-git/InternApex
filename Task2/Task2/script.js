document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    // Add event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            // If validation passes, you would typically send the form data
            // using AJAX (fetch API) or a full form submission to a server.
            // For this task, we'll just log it and show a success alert.
            alert('Form submitted successfully!');
            console.log('Form Data:', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter').checked
            });
            contactForm.reset(); // Clear the form fields after successful submission
        } else {
            console.log('Form validation failed.');
        }
    });

    /**
     * Validates all form fields.
     * @returns {boolean} True if all fields are valid, false otherwise.
     */
    function validateForm() {
        let isValid = true; // Assume valid until an error is found

        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectSelect = document.getElementById('subject');
        const messageTextarea = document.getElementById('message');

        // Helper function to display an error message
        function showError(element, message) {
            const errorDiv = document.getElementById(element.id + 'Error');
            if (errorDiv) {
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
                element.classList.add('invalid'); // Add class for styling
            }
        }

        // Helper function to hide an error message
        function hideError(element) {
            const errorDiv = document.getElementById(element.id + 'Error');
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.style.display = 'none';
                element.classList.remove('invalid'); // Remove class for styling
            }
        }

        // --- Validation Checks for each field ---

        // Name Validation: Required and not just whitespace
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        } else {
            hideError(nameInput);
        }

        // Email Validation: Required and matches email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        // Phone Validation: Optional, but if entered, must be 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid 10-digit phone number (digits only).');
            isValid = false;
        } else {
            hideError(phoneInput);
        }

        // Subject Validation: Must select an option other than the default
        if (subjectSelect.value === '') {
            showError(subjectSelect, 'Please select a subject.');
            isValid = false;
        } else {
            hideError(subjectSelect);
        }

        // Message Validation: Required and minimum length
        if (messageTextarea.value.trim() === '') {
            showError(messageTextarea, 'Message is required.');
            isValid = false;
        } else if (messageTextarea.value.trim().length < 10) {
            showError(messageTextarea, 'Message must be at least 10 characters long.');
            isValid = false;
        } else {
            hideError(messageTextarea);
        }

        return isValid;
    }

    // Optional: Add real-time validation on input blur (when user leaves a field)
    const formElements = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formElements.forEach(element => {
        element.addEventListener('blur', function() {
            // Only validate on blur if the field has some value or is marked as required in HTML
            if (element.value.trim() !== '' || element.hasAttribute('required')) {
                validateForm(); // Re-run full validation to show/hide errors for all fields
            }
        });
    });
});