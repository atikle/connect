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
            block: 'start'
        });
    } else {
        // Log an error if the element is not found, useful for debugging
        console.error('Element with ID "target-element-scroll" not found.');
    }
});