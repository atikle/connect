// theme.js

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const saveButton = document.getElementById('saveButton');

    // Function to apply the theme on load, respecting user override and system preference
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('darkMode');
        let isDarkMode;

        if (savedTheme !== null) {
            // Use the saved preference if it exists
            isDarkMode = savedTheme === 'true';
        } else {
            // Otherwise, fall back to the system's preferred color scheme
            isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        darkModeToggle.checked = isDarkMode;
        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Event listener for the dark mode toggle (this sets the user override)
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Listener for changes in the system's color scheme preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // Only update if the user hasn't manually set a theme
            if (localStorage.getItem('darkMode') === null) {
                const isSystemDark = event.matches;
                darkModeToggle.checked = isSystemDark;
                if (isSystemDark) {
                    body.classList.add('dark-mode');
                } else {
                    body.classList.remove('dark-mode');
                }
            }
        });
    }

    // Apply the theme when the page loads
    applyTheme();
});