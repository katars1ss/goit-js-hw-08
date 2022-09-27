import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
let lightbox;

const refs = {
    gallery : document.querySelector('.gallery'),
    galleryLink : document.querySelector('.gallery__item'),
    gallery_image : document.querySelector('.gallery__image'),
};

function createGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <a class = "gallery__item" href = "${original}">
            <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            />
        </a>
    `;  
    })
    .join('');
}

refs.gallery.insertAdjacentHTML("beforeend", createGallery(galleryItems));

lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
    animationSpeed : 250,
});

