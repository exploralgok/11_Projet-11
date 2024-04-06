(function ($) {
    $(document).ready(function () {

      let photos = [];
      let maxPages = 0 ;
      
      function sendAjax(data){

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
                return;            }

            // if (photos.length === 0){
            //   console.log('photo vide')
            //   photos = body.data.custom_posts;
            //   console.log(photos) 
            // } else {
            // console.log('photo pas vide')
            // // photos = $.merge(photos, body.data.custom_posts);
            // photos.push(...body.data.custom_posts);
            // console.log(photos)
            // }

            photos = body.data.custom_posts;
            console.log(photos)
            genererBlocsPhotos(); // Appel de la fonction avec les données des custom posts
            maxPages = body.data.maxPages
            // nbPost = body.data.nbPost
            console.log("maxPages")
            console.log(maxPages)
        })
        .catch(error => {
            console.error('Erreur lors de la requête Ajax :', error);
        });
      }

      let currentPageNb = 1;
      console.log(currentPageNb)

        // Fonction pour charger les custom posts au chargement de la page
        function chargerCustomPosts() {

          const customPostButton = document.querySelector('.js-load-custom-posts');
          if (customPostButton) {
              customPostButton.click()
              console.log("charge btn ok"); // Simuler un clic sur le bouton pour déclencher la requête AJAX au chargement de la page
          };

          const nonce = $('.js-load-custom-posts').data('nonce');
          const postid = $('.js-load-custom-posts').data('postid');
          console.log("postid")
          console.log(postid)
          const category = $('.js-load-custom-posts').data('category');
          const nbPost = $('.js-load-custom-posts').data('posts');

          console.log("nbPost");
          console.log(nbPost);

          const data = new URLSearchParams();
          data.append('action', 'recuperer_custom_posts');
          data.append('nonce', nonce);
          data.append('posts', nbPost); 
          if (postid != undefined) {
            data.append('postid', postid);
            console.log("append ok")
          }
          if (category != undefined) {
            data.append('category', category);
            console.log("append ok")
          }
          data.append('paged', currentPageNb);
          sendAjax(data)
          console.log("custom post ok")
        };

        
        // Fonction pour générer les blocs photos dans le DOM à partir des données récupérées
        function genererBlocsPhotos() {
            var container = document.getElementById('similar-photos').querySelector('.photos');


            // if (photos.length <= 8){
            //   console.log("+8 photos")
            //   container.innerHTML = '';
            // }
            // else{
            //   console.log("first photo")
            //   container.innerHTML = '';
            // }

            // if (photos.length >= 8){
            //   var i = 7;
            // }
            // custom_posts.forEach(function(custom_post) {

              for (var i = 0; i < photos.length; i++) {
                var custom_post = photos[i];
            
                // Bloc Photos
                var photoElement = document.createElement('div');
                photoElement.classList.add('block-photo');
                container.appendChild(photoElement);

                  // Image du bloc photo
                var imageElement = document.createElement('img');
                imageElement.src = custom_post.image_url;
                imageElement.alt = custom_post.caption;
                photoElement.appendChild(imageElement);

                    // Overlay de l'image
                var overlayElement = document.createElement('div');
                overlayElement.classList.add('block-overlay');
                photoElement.appendChild(overlayElement);

                      // Aller vers single page
                        // Lien 
                var postUrl = document.createElement('a');
                postUrl.href = custom_post.post_url;
                overlayElement.appendChild(postUrl);
                        // Icone 
                var templateUrl = object_name.templateUrl;
                var eyeIcon = document.createElement('img');
                eyeIcon.classList.add('icon', 'eye');
                eyeIcon.src = templateUrl + '/assets/images/Icon_eye.png';
                        // Rendre l'icone cliquable
                postUrl.appendChild(eyeIcon);

                      // Affichage informations
                        // Catégorie 
                var categorie = document.createElement('p');
                categorie.classList.add('block-property', 'category');
                const nodeCategorie = document.createTextNode(custom_post.categorie);
                categorie.appendChild(nodeCategorie);
                overlayElement.appendChild(categorie);
                        // Titre
                var title = document.createElement('p');
                title.classList.add('block-property', 'reference');
                const nodeTitle = document.createTextNode(custom_post.caption);
                title.appendChild(nodeTitle);
                overlayElement.appendChild(title);

                      // Lightbox
                        // Fake Lien 
                var fullScreenUrl = document.createElement('a');
                // fullScreenUrl.href = custom_post.post_url;
                overlayElement.appendChild(fullScreenUrl);
                        // Icone
                var fullscreenIcon = document.createElement('img');
                fullscreenIcon.classList.add('icon', 'fullscreen');
                fullscreenIcon.src = templateUrl + '/assets/images/Icon_fullscreen.png' 
                fullscreenIcon.alt = "Plein écran";
                        // Rendre l'icone cliquable
                fullScreenUrl.appendChild(fullscreenIcon);
                        // Image séléctionnée
                var imageLightbox = document.createElement('img');
                imageLightbox.src = custom_post.image_url;
                imageLightbox.alt = custom_post.caption;
                var lightbox =  document.querySelector('.lightbox')
                lightbox.appendChild(imageLightbox);
                imageLightbox.classList.add('photo-full');
                        // Référence de la photo
                var lightboxProperty = document.querySelector('.lightbox-property')
                var pReference = document.createElement('p');
                pReference.textContent = custom_post.reference;
                pReference.classList.add('block-property', 'reference');
                lightboxProperty.appendChild(pReference);
                       // Catégorie de la photo
                var pCategory = document.createElement('p');
                pCategory.textContent = custom_post.categorie;
                lightboxProperty.appendChild(pCategory);
                        // Lien previous photo
                var aPreviousWrapper = document.querySelector('.previous-container');
                aPreviousWrapper.href = custom_post.previous_url
                        // next photo
                var aNextWrapper = document.querySelector('.next-container');
                aNextWrapper.href = custom_post.next_url
            };
            
        };

        // Appeler la fonction pour charger les custom posts au chargement de la page

        chargerCustomPosts()

        // ouverture  lightbox

        $('.fullscreen').on('click', function(event) {
          console.log('click fullscreen')
          const lightboxWrapper = document.querySelector(".lightbox-wrapper");
          lightboxWrapper.style.display = "block";
        })

        // Charger +

        $('#load-more').on('click', function(event) {
          console.log("charger plus")
          event.preventDefault();
          // On incrémente currentPage de 1, car nous voulons charger la page suivante
          currentPageNb++; 
          console.log(currentPageNb)
          // quand j'ai attteins le nombre de page max, je charge les dernières photos et je cache le bouton
          if (currentPageNb >= maxPages) {
            console.log("currentPageNb")
            console.log(currentPageNb)
            console.log("maxPages")
            console.log(maxPages)

             const data = new URLSearchParams();
             data.append('action', 'recuperer_custom_posts');
             data.append('paged', currentPageNb);
             sendAjax(data);
            $(".btn__wrapper").hide();
            console.log("hide done")
            // chargerCustomPosts()
          }
          else{
            console.log("hide NOT done")
            console.log(currentPageNb)
            console.log(maxPages)

            const data = new URLSearchParams();
            data.append('action', 'recuperer_custom_posts');
           data.append('paged', currentPageNb);

            sendAjax(data);
          }

        });


        // filtres
            $('.cat-list, .format-list, .order-list').on('change', function(event) {

              event.preventDefault();

              const data = new URLSearchParams();
              data.append('action', 'recuperer_custom_posts');

              var category = $('.cat-list').val()
              data.append('category', category);
              console.log(category)

              var format = $('.format-list').val()
              data.append('format', format);
              console.log(format)

              var order = $('.order-list').val()
              data.append('order', order);
              console.log(order)
              
              const nbPost = $('.js-load-custom-posts').data('posts');
              data.append('posts', nbPost); 

              data.append('paged', currentPageNb);

              var container = document.getElementById('similar-photos').querySelector('.photos');
              container.innerHTML = '';

              if (currentPageNb >= maxPages) {
                $(".btn__wrapper").hide();
                console.log("hide done")
              }
      
              sendAjax(data)
          });


      //  var reference = document.getElementById("reference-value").innerText;
      //  // insérer la valeur
      //  document.getElementById("reference").value = reference;

        
    });
})(jQuery);