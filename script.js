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
const loadingSpinner = document.querySelector("#loading-spinner");

let page = 1; // Initialize page counter
let query = 'booty'; // Initialize search query
let images = [];
imageContainer.innerHTML = ''
// Function to retrieve and display images for a search query
async function getAndDisplayImages(query) {

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
        imageContainer.appendChild(imgElement);
        // lastCardObserver.observe(document.querySelector('.image-thumbnail:last-child'));
        // images.forEach(img => {
        //     imageContainer.appendChild(img)
        // });
    });
}

// getAndDisplayImages starting point
getAndDisplayImages(query);

//adding intersection observer for lazy load of images retrieved and applying infinite scroll
// const lastCardObserver = new IntersectionObserver(entries => {
//     const lastCard = entries[0];
//     if (!lastCard.isIntersecting) return;
//     if(lastCard.isIntersecting) lastCardObserver.unobserve(lastCard.target)
//     getAndDisplayImages(query);
//     lastCardObserver.unobserve(lastCard.target);
//     lastCardObserver.observe(document.querySelector('.image-thumbnail:last-child'));
// }, {
//     rootMargin: "100px",
//     threshold: 0.5,
// });

// Function to open the modal and display the full-size image
function openModal(imageUrl) {
    modalImage.src = imageUrl;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
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
    document.body.style.overflow = 'unset';
}
// Event listeners for the modal
// modal.addEventListener('click', closeModal);
closeButton.addEventListener('click', closeModal);
closeMobile.addEventListener('click', closeModal);

// Event listener for the search form
form.addEventListener('submit', event => {
    event.preventDefault();
    // Reset the page counter and update the search query
    page = 1;
    query = queryInput.value;
    // Clear the current images from the page
    imageContainer.innerHTML = '';
    images.splice(0, images.length)
    // Retrieve and display the images for the new search query
    getAndDisplayImages(query);
});

window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= this.document.body.offsetHeight) {
        loadingSpinner.style.display = 'block';
        setTimeout(function loadmore() {
            if (page < 11) {
                page++;
                getAndDisplayImages(query);
            } else {
                this.window.scrollTo(-200, this.window.innerHeight);
            }
            loadingSpinner.style.display = 'none';
        }, 1500);
    }
});