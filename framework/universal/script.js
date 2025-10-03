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




// Hide/show header & nav-bar upon scrooling
$(function () {
    // Define the loading operations for the header and navbar
    var loadHeader = $("#header-placeholder").load("https://atikle.github.io/connect/framework/header.html");
    var loadNavbar = $("#navbar-placeholder").load("https://atikle.github.io/connect/framework/navbar.html");

    // Use jQuery's $.when() to wait for BOTH operations to complete
    $.when(loadHeader, loadNavbar).done(function () {

        // This code is guaranteed to run AFTER BOTH are loaded.
        const header = document.querySelector('.logo-para');
        const navbar = document.querySelector('.navigation');

        // Safeguard if either element isn't found
        if (!header || !navbar) return;

        let lastScrollTop = 0;

        // Listen for scroll events on the window
        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Only run this logic on mobile screens
            if (window.matchMedia("(max-width: 768px)").matches) {
                // Check scroll direction and add a small threshold (65px)
                if (scrollTop > lastScrollTop && scrollTop > 65) {
                    // Scrolling Down: hide both header and navbar
                    header.classList.add('header--hidden');
                    navbar.classList.add('navbar--hidden');
                } else {
                    // Scrolling Up: show both header and navbar
                    header.classList.remove('header--hidden');
                    navbar.classList.remove('navbar--hidden');
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    });
});