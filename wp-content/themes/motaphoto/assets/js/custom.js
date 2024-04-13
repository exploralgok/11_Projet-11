document.addEventListener("DOMContentLoaded", function () {
        
    // ** MODALE **
    var contactItems = document.querySelectorAll(".popup-contact");
    const popup = document.querySelector(".popup");
    const overlay = document.querySelector(".popup-overlay");

    contactItems.forEach(function (contactItem) {
        // Ouverture de la modale
        contactItem.onclick = function (event) {
            event.preventDefault()
            popup.style.display = "flex";
            overlay.style.display = "block";
        }
        // Fermerture de la popup
        window.addEventListener("click", function (event) {
            // Si la popup est affichée
            // Si l'élément sur lequel le clic a été effectué n'est pas contenu dans la popup
            // Si l'élément sur lequel le clic a été effectué n'est pas l'élément qui ouvre la popup
            if (popup.style.display === "flex" && !popup.contains(event.target) && !isClickedOnContactItem(event.target)) {
                popup.style.display = "none";
                overlay.style.display = "none";
            }
        });
    });
    function isClickedOnContactItem(target) {
        for (var i = 0; i < contactItems.length; i++) {
            if (contactItems[i].contains(target)) {
                return true;
            }
        }
        return false;
    }

    // Gestion dynamique de la référence
    // récupérer la valeur sur la page
    var reference = document.getElementById("reference-value").innerText;
    // insérer la valeur dans le form
    document.getElementById("reference").value = reference;

    // ** HOVER NAVIGATION **
    var arrowItems = document.querySelectorAll(".arrow");
    var thumbnailItems = document.querySelectorAll(".thumbnail")
   
    for(let i = 0; i < arrowItems.length; i++){
        arrowItems[i].onmouseover = function () {
            thumbnailItems[i].classList.add("thumbnail-display");
        }
        arrowItems[i].onmouseout = function () {
            thumbnailItems[i].classList.remove("thumbnail-display");
        }
    };
});


(function ($) {
    $(document).ready(function() {

        // ** MISE EN FORME DU SELECTEUR (Lib) **
        // Suppression du champ recherche
        $('.dropdown').select2({
            minimumResultsForSearch: Infinity
        });
        // Remplacement du chevron
        $('b[role="presentation"]').hide();
        // Gestion des couleurs de selection
        $('.select2-results__option--highligted').click(function() {
            $(this).addClass(".select2-results__option--selected");
        }).mousedown(function(){
            $(this).removeClass(".select2-results__option--highlighted").addClass(".select2-results__option--pressed");
        }).mouseup(function(){
            $(this).removeClass(".select2-results__option--pressed").addClass(".select2-results__option--selected");
        });

        // ** MENU BURGER **
          $(".nav-bar__links.mobile").click(function() {
            $('.header.mobile').toggleClass("open");
          });
    })
})(jQuery);