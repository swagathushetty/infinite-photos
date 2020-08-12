const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const count = 30
const apiKey = 'EBCUoYKeTBOIdmHcCGC1J-nYitn3ij4igL6KMBcD35g'
// Unsplash API
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    console.log('ran')
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        console.log('ran')
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    } catch (error) {
        console.log('error is',error.message)
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();