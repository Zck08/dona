"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 10;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    resizeNoButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  } else if (noCount === 13) noButton.style.display = "none";
});

function handleYesClick() {
  titleElement.innerHTML = "Lo siento mucho, te hice sentir mal y no quiero volver a hacerlo, gracias";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  window.navigator.vibrate(2000);
  catImg.addEventListener(
    "dblclick",
    () => (titleElement.innerHTML = "")
  );
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.3;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function resizeNoButton() {
  const computedStyle = window.getComputedStyle(noButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));

  noButton.style.fontSize = `${fontSize * 0.9}px`;
}

function generateMessage(noCount) {
  const messages = [
    "Lo entiendo, no quiero hacerte daño y no va a volver a pasar, lo siento mucho, me importa mucho como te sientes y esta no es forma de tratarte",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
