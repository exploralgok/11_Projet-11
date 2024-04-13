document.addEventListener("DOMContentLoaded", function () {
    
    console.log("deb")
    
    // //  Popup
    var contactItems = document.querySelectorAll(".popup-contact");
    const popup = document.querySelector(".popup");
    // // const siteBackground = document.querySelector(".site");
    const overlay = document.querySelector(".popup-overlay");

    contactItems.forEach(function (contactItem) {
        // ouvertur de la popup
        contactItem.onclick = function (event) {
            event.preventDefault()
            popup.style.display = "flex";
            overlay.style.display = "block";
        }

        // fermerture de la popup
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
        // Vérifie si l'élément cliqué est l'un des éléments qui ouvre la popup
        for (var i = 0; i < contactItems.length; i++) {
            if (contactItems[i].contains(target)) {
                return true;
            }
        }
        return false;
    }


    // Gestion dynamique de la référence

    // récupérer la valeur
    var reference = document.getElementById("reference-value").innerText;
    // insérer la valeur
    document.getElementById("reference").value = reference;

    // Hover navigation
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

    console.log('ok')


});

//Select dropdown

(function ($) {
    $(document).ready(function() {
        $('.dropdown').select2({
            minimumResultsForSearch: Infinity
        });

        $('b[role="presentation"]').hide();

        $('.select2-results__option--highligted').click(function() {
            $(this).addClass(".select2-results__option--selected");
        }).mousedown(function(){
            $(this).removeClass(".select2-results__option--highlighted").addClass(".select2-results__option--pressed");
        }).mouseup(function(){
            $(this).removeClass(".select2-results__option--pressed").addClass(".select2-results__option--selected");
        console.log("color");
        });

        // $( "#toggle" ).on( "click", function() {
        //     console.log("something");
        //     $(this).addClass( "active" );
        //     $(this).toggleClass( "active" );
        //     $(".menu-header-container").addClass( "mobile-menu" );
        //     // $(".menu-header-container").css("display", "flex");
        //     $(".menu-header-container").toggle()
        //     });


        // Script du menu burger


        console.log("debut")

        $(function() {
          $(".nav-bar__links.mobile").click(function() {
            $('.header.mobile').toggleClass("open");
            // $('.header.mobile').show();
            console.log('open')
          });
        });

    })
})(jQuery);