document.addEventListener("DOMContentLoaded", function () {

    //lightbox AJAX
    // (function ($) {
    //     $(document).ready(function () {

    //         // Chargment des commentaires en Ajax
    //         // $('.js-load-comments').submit(function (e) {
    //         // Déclencheur de la lightbox
    //         // $('.icon.fullscreen').click(function (e) {
    //         $('.js-load-comments').click(function (e) {

    //             // Empêcher l'envoi classique du formulaire
    //             e.preventDefault();

    //             // L'URL qui réceptionne les requêtes Ajax dans l'attribut "action" de <form>
    //             const ajaxurl = $(this).data('ajaxurl');


    //             // Les données de notre formulaire
    //             // ⚠️ Ne changez pas le nom "action" !
    //             const data = {
    //                 action: $(this).data('action'),
    //                 nonce:  $(this).data('nonce'),
    //                 postid: $(this).data('postid'),
    //             }

    //             // Pour vérifier qu'on a bien récupéré les données
    //             console.log(ajaxurl);
    //             console.log(data);

    //             // Requête Ajax en JS natif via Fetch
    //             fetch(ajaxurl, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                     'Cache-Control': 'no-cache',
    //                 },
    //                 body: new URLSearchParams(data),

    //             })
    //             .then(response => response.json())
    //             .then(body => {
    //                 console.log(body);

    //                 // En cas d'erreur
    //                 if (!body.success) {
    //                     alert(response.data);
    //                     return;
    //                 }

    //                 // Et en cas de réussite
    //                 // Cacher le formulaire
    //                 // $(this).hide(); 

    //                 // Afficher la lightbox
    //                 const lightboxWrapper = document.querySelector(".lightbox-wrapper");
    //                 lightboxWrapper.style.display = "block";

    //                 // Ajouter le contenu dans la lightbox
    //                 $('.lightbox').prepend(body.data.lightbox_content); 
    //                 $('.lightbox-property').prepend(body.data.lightbox_content_property);
    //                 $('.next-wrapper').prepend(body.data.html_content_next_post);
    //                 // $(".next-wrapper").attr('href', body.data.lightbox_next_post_url);


    //                 // fermeture lightbox
    //                 const close = document.querySelector(".close");
    //                 const lightbox = document.querySelector('.lightbox');
    //                 const lightboxProperty = document.querySelector('.lightbox-property');
    //                 const photoFull = document.querySelector('.photo-full');
    //                 const blockProperty = document.querySelectorAll('.block-property');

    //                 close.addEventListener("click", function (event) {
    //                     blockProperty.forEach(el => el.remove())
    //                     photoFull.remove() ;
    //                     lightboxWrapper.style.display = "none";
    //                 });


    //             })


    //             .catch(error => {
    //                 console.error('Erreur lors de la requête Ajax :', error);
    //                 // Gérer les erreurs de requête Ajax ici
    //             });


    //         });



    //     });
    // })(jQuery);


// V2 AJAX

(function ($) {
    $(document).ready(function () {
        let photos = [];

        // Fonction pour charger les custom posts au chargement de la page
        function chargerCustomPosts(currentPage) {

            const customPostButton = document.querySelector('.js-load-custom-posts');
            if (customPostButton) {
                customPostButton.click(); // Simuler un clic sur le bouton pour déclencher la requête AJAX au chargement de la page
            };

            const nonce = $('.js-load-custom-posts').data('nonce');
            const postid = $('.js-load-custom-posts').data('postid');
            const category = $('.js-load-custom-posts').data('category');

            const data = new URLSearchParams();
            data.append('action', 'recuperer_custom_posts');
            data.append('nonce', nonce);
            data.append('page', currentPage); // Ajouter le paramètre de page
            data.append('postid', postid);
            data.append('category', category);
        
            console.log(currentPage);

            fetch(ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: data,

            })
            .then(response => 
                {
                    if (!response.ok) {
                      throw new Error('Erreur lors de la requête fetch');
                    }
                    return response.json();
                  }
                
                )
            .then(body => {
                if (!body.success) {
                    alert(response.data);
                    return;
                }
                photos = body.data;
                console.log(photos)
                genererBlocsPhotos(); // Appel de la fonction avec les données des custom posts

            })
            .catch(error => {
                console.error('Erreur lors de la requête Ajax :', error);
            });
        };

        
        // Fonction pour générer les blocs photos dans le DOM à partir des données récupérées
        function genererBlocsPhotos() {
            var container = document.getElementById('similar-photos').querySelector('.photos');
            console.log("containter ok");

            container.innerHTML = '';

            // custom_posts.forEach(function(custom_post) {
            for (var i = 0; i < photos.length; i++) {
                var custom_post = photos[i];
                console.log("custom_post")
                console.log(custom_post)
            
                var photoElement = document.createElement('div');
                photoElement.classList.add('block-photo');

                var imageElement = document.createElement('img');
                imageElement.src = custom_post.image_url;
                imageElement.alt = custom_post.caption;

                var overlayElement = document.createElement('div');
                overlayElement.classList.add('block-overlay');

                // Vers single page

                var postUrl = document.createElement('a');
                postUrl.href = custom_post.post_url;
                overlayElement.appendChild(postUrl);

                var templateUrl = object_name.templateUrl;

                var eyeIcon = document.createElement('img');
                eyeIcon.classList.add('icon', 'eye');
                eyeIcon.src = templateUrl + '/assets/images/Icon_eye.png';

                postUrl.appendChild(eyeIcon);


                // Lightbox

                var fullScreenUrl = document.createElement('a');
                fullScreenUrl.href = custom_post.post_url; // doit renvoyer vers la lightbox et non le single post

                overlayElement.appendChild(fullScreenUrl);

                var fullscreenIcon = document.createElement('img');
                fullscreenIcon.classList.add('icon', 'fullscreen');
                fullscreenIcon.src = templateUrl + '/assets/images/Icon_fullscreen.png' 
                fullscreenIcon.alt = "Plein écran";

                postUrl.appendChild(fullscreenIcon);

                // Ajoutez d'autres éléments de votre bloc photo ici

                var categorie = document.createElement('p');
                categorie.classList.add('block-property', 'category');
                const nodeCategorie = document.createTextNode(custom_post.categorie);
                categorie.appendChild(nodeCategorie);

                overlayElement.appendChild(categorie);

                var reference = document.createElement('p');
                reference.classList.add('block-property', 'reference');
                const nodeReference = document.createTextNode(custom_post.reference);
                reference.appendChild(nodeReference);

                overlayElement.appendChild(reference);

                // overlayElement.appendChild(fullscreenButton);

                photoElement.appendChild(imageElement);
                photoElement.appendChild(overlayElement);

                container.appendChild(photoElement);

            };
        };

        // Appeler la fonction pour charger les custom posts au chargement de la page

        if ( vars.page == "single-photo" ) {
            chargerCustomPosts("single-photo");
             // Appel pour la deuxième page
        } else if (vars.page == 'index') {
            chargerCustomPosts("index");
        };


        // Charger +
        let currentPageNb = 1;

        $('#load-more').on('click', function() {
            currentPageNb++; // On incrémente currentPage de 1, car nous voulons charger la page suivante
        
          const data = new URLSearchParams();
          data.append('action', 'recuperer_custom_posts');
          data.append('paged', currentPageNb);
    
          fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: data
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la requête fetch');
            }
            return response.json();
          })
          .then(body => {
            // $('.photos').append(body);
            // console.log(body)
            photos = body.data;
            console.log(photos)
            genererBlocsPhotos(); // Appel de la fonction avec les données des custom posts


          })
          .catch(error => {
            console.error('Erreur lors de la requête fetch:', error);
          });
        });
    });
})(jQuery);



});