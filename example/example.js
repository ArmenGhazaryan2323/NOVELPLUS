const images = document.querySelectorAll('.slide');
let index = 0; // Initial index (starts at 0)
const totalSlides = images.length; // Total number of images

// Function to update the slide position
function updateSlidePosition() {
    const position = -(index * 33.33); // Move the container by 33.33% of the width (1 slide)
    document.querySelector('.image-container').style.transform = `translateX(${position}%)`;
}

// Function to handle swiping left (next slide)
function moveToNext() {
    index = (index + 1) % totalSlides; // Loop back to 0 when reaching the last slide
    updateSlidePosition();
}

// Function to handle swiping right (previous slide)
function moveToPrev() {
    index = (index - 1 + totalSlides) % totalSlides; // Loop back to the last slide when moving left from the first one
    updateSlidePosition();
}

// Add event listeners for swipe actions (left and right)
let startX = 0;
let endX = 0;

// Handle touch start (for swipe)
document.querySelector('.slideshow-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

// Handle touch move (for swipe)
document.querySelector('.slideshow-container').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        // Swipe left
        moveToNext();
    } else if (endX - startX > 50) {
        // Swipe right
        moveToPrev();
    }
});

// Initialize the first view
updateSlidePosition();
