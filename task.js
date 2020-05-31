"use strict"
import imageArray from "./gallery-items.js"

// Add images to Gallery
const gallery = document.querySelector(".js-gallery");
const galleryCode = imageArray.reduce((code, image) => code + `<li class="gallery__item">\n<a class="gallery__link" href=${image.original}>\n<img class="gallery__image" src=${image.preview} data-source=${image.original} alt=${image.description} />\n</a>\n</li>`, "");
gallery.insertAdjacentHTML('afterbegin', galleryCode);

// Click on Gallery
const modalWindow = document.querySelector(".js-lightbox");
const modalImage = document.querySelector(".lightbox__image");
let currentListItem = {};
const clickOnImage = function (event) {
  event.preventDefault();
  const targetImage = event.target;
  currentListItem = event.target.offsetParent;
  modalWindow.classList.add("is-open");
  modalImage.src = targetImage.dataset.source;
}
gallery.addEventListener("click", clickOnImage);

//Close full image 
const closeButton = document.querySelector("button[data-action='close-lightbox']");
const overlay = document.querySelector("div.js-lightbox");
const closeFullImage = () => {
  modalWindow.classList.remove("is-open");
  modalImage.src = "";
}
closeButton.addEventListener("click", closeFullImage);
overlay.addEventListener("click", closeFullImage);

//KeyDown events
const keyPressAction = function (event) {
  if (modalWindow.classList.contains("is-open")) {
    switch (event.code) {
      case "Escape":
        closeFullImage();
        break;
      case "ArrowLeft":
        (currentListItem.previousSibling === null) ? currentListItem = currentListItem : currentListItem = currentListItem.previousSibling;
        modalImage.src = currentListItem.children[0].children[0].dataset.source;
        break;
      case "ArrowRight":
        (currentListItem.nextSibling === null) ? currentListItem = currentListItem : currentListItem = currentListItem.nextSibling;
        modalImage.src = currentListItem.children[0].children[0].dataset.source;
        break;
      default:
        break;
    };
  };
};
document.addEventListener("keydown", keyPressAction);