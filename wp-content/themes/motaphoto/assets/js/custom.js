document.addEventListener("DOMContentLoaded", function () {

    // Ouverture de la popup : contact-header
    var contactItem = document.querySelector(".popup-contact");
    const popup = document.querySelector(".popup");

    contactItem.onclick = function (event) {
        event.preventDefault()
        popup.style.display = "flex";
    }

    // fermerture de la popup
    window.addEventListener("click", function (event) {
        // Si la popup est affichée
        // Si l'élément sur lequel le clic a été effectué n'est pas contenu dans la popup 
        // Si l'élément sur lequel le clic a été effectué n'est pas l'élément qui ouvre la popup
        if (popup.style.display === "flex" && !popup.contains(event.target) && !contactItem.contains(event.target)) {
            popup.style.display = "none";
        }
    });







});