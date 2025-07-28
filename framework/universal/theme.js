// theme.js

// This script runs instantly to set the theme and avoid a flash of unstyled content (FOUC).
// It checks for a user-saved preference, and falls back to the system theme.
(function () {
    let isDarkMode;
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme !== null) {
        // Use the user's saved preference
        isDarkMode = savedTheme === 'true';
    } else {
        // If no preference is saved, use the system's theme
        isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDarkMode) {
        // Add the 'dark-mode' class to the <html> element
        document.documentElement.classList.add('dark-mode');
    }
})();

// This script runs after the DOM is loaded to handle user interactions.
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const saveButton = document.getElementById('saveButton');
    const docElement = document.documentElement; // The <html> element

    // Function to set the initial state of the toggle switch.
    // The theme itself is already applied by the script in the <head>.
    const initializeToggle = () => {
        darkModeToggle.checked = docElement.classList.contains('dark-mode');
    };

    // Event listener for when the user clicks the dark mode toggle.
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            docElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true'); // Save user preference
        } else {
            docElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false'); // Save user preference
        }
    });

    // Listener for when the system's color scheme changes.
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // This will only apply the system theme if the user has NOT manually
            // set a theme using the toggle switch.
            if (localStorage.getItem('darkMode') === null) {
                const isSystemDark = event.matches;
                darkModeToggle.checked = isSystemDark;
                if (isSystemDark) {
                    docElement.classList.add('dark-mode');
                } else {
                    docElement.classList.remove('dark-mode');
                }
            }
        });
    }

    // Set the initial state of the toggle when the page loads.
    initializeToggle();
});