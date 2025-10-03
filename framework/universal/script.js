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




// Hide/show nav bar upon scrooling
// Wait for the DOM to be fully loaded before running the script
        document.addEventListener("DOMContentLoaded", function() {
            // Check if the navbar element exists on the page
            const navbar = document.querySelector('.navigation');
            
            // If navbar doesn't exist, don't run the rest of the script
            if (!navbar) return;

            let lastScrollTop = 0;

            // Listen for scroll events on the window
            window.addEventListener('scroll', function() {
                // Get the current scroll position from the top of the page
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Check if we are on a mobile device by checking the media query
                if (window.matchMedia("(max-width: 768px)").matches) {
                    if (scrollTop > lastScrollTop) {
                        // Scrolling Down: hide the navbar
                        navbar.classList.add('navbar--hidden');
                    } else {
                        // Scrolling Up: show the navbar
                        navbar.classList.remove('navbar--hidden');
                    }
                }
                
                // Update the last scroll position
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, false);
        });