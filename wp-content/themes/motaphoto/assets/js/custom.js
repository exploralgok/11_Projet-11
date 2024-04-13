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
    /// lightbox

    // menu burger

    // const links = document.getElementById("toggle");
    // const links = document.querySelector(".hero");
    // console.log(links)

    // links.addEventListener("click", function(event) {
    //     console.log(links)
    //     // event.preventDefault();
    //     console.log("burger click open");
    //     links.classList.add("active");
    // });

    // links.forEach((link) => {
    //     link.addEventListener("click", () => {
    //         nav.classList.remove("active");
    //     });
    // });

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

        console.log('menuBurger.js');

        const header = $('header');
        const menuBurger = $('.hamburger');
        const nav = $('.menu-header-container');

        // const menuLinks = $('.menu-header li a');

        menuBurger.on('click', function () {
            const isOpen = header.hasClass('open');
            header.toggleClass('open', !isOpen);
            $('.nav-wrapper-mobile').toggleClass('open', !isOpen);
            $('.nav-desktop').toggleClass('open', !isOpen);
            menuBurger.toggleClass('open', !isOpen);
            nav.toggleClass('open', !isOpen);
        });
    })
})(jQuery);