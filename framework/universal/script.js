// document.addEventListener('DOMContentLoaded', (event) => {
//     const targetElement = document.getElementById('target-element-scroll');
//     if (targetElement) {
//         targetElement.scrollIntoView({
//             behavior: 'smooth', // Optional: 'auto' for instant scroll, 'smooth' for animated scroll
//             block: 'center'     // Optional: 'start', 'center', 'end', 'nearest' (vertical alignment)
//                                 // 'start' aligns top of element to top of scroll area
//                                 // 'center' aligns element to middle of scroll area
//                                 // 'end' aligns bottom of element to bottom of scroll area
//                                 // 'nearest' scrolls the least amount to make element visible
//         });
//     }
// });

// Wait for the entire DOM content to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the target element using its ID
    const targetElement = document.getElementById('target-element-scroll');

    // Check if the target element exists on the page
    if (targetElement) {
        // Use scrollIntoView() to scroll the element into the visible area
        // 'behavior: "smooth"' provides a smooth scrolling animation
        // 'block: "center"' attempts to align the element in the middle of the scrollable area
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    } else {
        // Log an error if the element is not found, useful for debugging
        console.error('Element with ID "target-element-scroll" not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const saveButton = document.getElementById('saveButton');

    // Function to apply the saved theme on load
    const applyTheme = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        darkModeToggle.checked = isDarkMode;
        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Event listener for the dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Event listener for the save button (for demonstration)
    saveButton.addEventListener('click', () => {
        // In a real app, you would collect all settings and save them.
        // For this demo, we'll just show a temporary confirmation.
        const originalText = saveButton.textContent;
        saveButton.textContent = 'Saved!';
        saveButton.style.opacity = '0.7';
        saveButton.disabled = true;

        setTimeout(() => {
            saveButton.textContent = originalText;
            saveButton.style.opacity = '1';
            saveButton.disabled = false;
        }, 2000);
    });

    // Apply the theme when the page loads
    applyTheme();
});