document.addEventListener("DOMContentLoaded", function () {

    //  Popup
    var contactItems = document.querySelectorAll(".popup-contact");
    const popup = document.querySelector(".popup");
    // const siteBackground = document.querySelector(".site");
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

    //lightbox AJAX
    (function ($) {
        $(document).ready(function () {

            // Chargment des commentaires en Ajax
            // $('.js-load-comments').submit(function (e) {
            // Déclencheur de la lightbox
            // $('.icon.fullscreen').click(function (e) {
            $('.js-load-comments').click(function (e) {

                // Empêcher l'envoi classique du formulaire
                e.preventDefault();

                // L'URL qui réceptionne les requêtes Ajax dans l'attribut "action" de <form>
                const ajaxurl = $(this).data('ajaxurl');


                // Les données de notre formulaire
                // ⚠️ Ne changez pas le nom "action" !
                const data = {
                    action: $(this).data('action'),
                    nonce:  $(this).data('nonce'),
                    postid: $(this).data('postid'),
                }

                // Pour vérifier qu'on a bien récupéré les données
                console.log(ajaxurl);
                console.log(data);

                // Requête Ajax en JS natif via Fetch
                fetch(ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache',
                    },
                    body: new URLSearchParams(data),

                })
                .then(response => response.json())
                .then(body => {
                    console.log(body);

                    // En cas d'erreur
                    if (!body.success) {
                        alert(response.data);
                        return;
                    }

                    // Et en cas de réussite
                    // Cacher le formulaire
                    // $(this).hide(); 

                    // Afficher la lightbox
                    const lightboxWrapper = document.querySelector(".lightbox-wrapper");
                    lightboxWrapper.style.display = "block";

                    // Ajouter le contenu dans la lightbox
                    $('.lightbox').prepend(body.data.lightbox_content); 
                    $('.lightbox-property').prepend(body.data.lightbox_content_property);
                    $('.next-wrapper').prepend(body.data.html_content_next_post);
                    // $(".next-wrapper").attr('href', body.data.lightbox_next_post_url);


                    // fermeture lightbox
                    const close = document.querySelector(".close");
                    const lightbox = document.querySelector('.lightbox');
                    const lightboxProperty = document.querySelector('.lightbox-property');
                    const photoFull = document.querySelector('.photo-full');
                    const blockProperty = document.querySelectorAll('.block-property');

                    close.addEventListener("click", function (event) {
                        blockProperty.forEach(el => el.remove())
                        photoFull.remove() ;
                        lightboxWrapper.style.display = "none";
                    });


                })


                .catch(error => {
                    console.error('Erreur lors de la requête Ajax :', error);
                    // Gérer les erreurs de requête Ajax ici
                });


            });



        });
    })(jQuery);



});