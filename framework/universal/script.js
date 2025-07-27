document.addEventListener('DOMContentLoaded', (event) => {
    const targetElement = document.getElementById('target-element-scroll');
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth', // Optional: 'auto' for instant scroll, 'smooth' for animated scroll
            block: 'center'     // Optional: 'start', 'center', 'end', 'nearest' (vertical alignment)
                                // 'start' aligns top of element to top of scroll area
                                // 'center' aligns element to middle of scroll area
                                // 'end' aligns bottom of element to bottom of scroll area
                                // 'nearest' scrolls the least amount to make element visible
        });
    }
});