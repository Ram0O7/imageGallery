const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const imageContainer = document.getElementById('image-container');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeButton = document.querySelector('.close');
const carousel = document.getElementById('carousel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const closeMobile = document.querySelector('.mb-close');

let page = 1; // Initialize page counter
let query = 'booty'; // Initialize search query
let images = [];

// Function to retrieve and display images for a search query
async function getAndDisplayImages(query) {
    // Clear the current images from the page
    imageContainer.innerHTML = '';

    // Make API request to retrieve images for the search query
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=20`, {
        headers: {
            Authorization: 'Client-ID C6GdAoiuC4jzRqCNlt3sAZKjvI9-QGwRLmFOqVfG_JU'
        }
    });
    const data = await response.json();

    // Add images to the page
    data.results.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.description;
        imgElement.classList.add('image-thumbnail');
        imgElement.addEventListener('click', () => openModal(image.urls.full));
        images.push(imgElement);
        // imageContainer.appendChild(imgElement);
        images.forEach(img => {
            imageContainer.appendChild(img)
        });
    });
}

// Function to open the modal and display the full-size image
function openModal(imageUrl) {
    modalImage.src = imageUrl;
    modal.style.display = 'block';
    // Display the carousel images
    images.forEach((image, index) => {
        if (index === currentImageIndex) {
            image.style.display = 'block';
        } else {
            image.style.display = 'none';
        }
    });
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
    modalImage.src = '';
}

// Event listeners for the modal
// modal.addEventListener('click', closeModal);
closeButton.addEventListener('click', closeModal);
closeMobile.addEventListener('click', closeModal);

// Function to handle the scroll event
// function handleScroll() {
//     // Check if the user has scrolled to the bottom of the page
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         // Increment the page counter and retrieve more images
//         console.log("hii there!")
//     }
// }

// Event listener for the search form
form.addEventListener('submit', event => {
    event.preventDefault();
    // Reset the page counter and update the search query
    page = 1;
    query = queryInput.value;
    images.splice(0,images.length)
    // Retrieve and display the images for the new search query
    getAndDisplayImages(query);
});

// Initialize the app by retrieving and displaying the first set of images
getAndDisplayImages(query);

function pageDown() {
    window.scrollTo(0, document.body.scrollHeight - 50);
    page++;
    getAndDisplayImages(query);
}
  
function pageDown_() {
    window.scrollTo(0, document.body.scrollHeight - 50);
  }
  

// Implement infinite scroll by tracking the user's scroll position and making
// additional API requests to retrieve more images as the user scrolls down
// window.addEventListener('scroll', handleScroll);
