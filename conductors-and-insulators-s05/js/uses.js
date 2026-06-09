const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupIcon = document.getElementById("popupIcon");

document.querySelectorAll(".use-card").forEach((card) => {
    card.addEventListener("click", () => showInfo(card));
});

function showInfo(card) {
    popupTitle.textContent = card.dataset.title;
    popupText.textContent = card.dataset.text;
    popupIcon.textContent = card.dataset.icon;
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
}

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        closePopup();
    }
});
