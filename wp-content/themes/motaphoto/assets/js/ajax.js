(function ($) {
  $(document).ready(function () {

    // ** INITIALISATION DES VARIABLES **
    let photos = [];
    let maxPages;
    let currentPageNb = 1;
    const data = new URLSearchParams();
    var container = document.getElementById('similar-photos').querySelector('.photos');
    let nbPhotoDom = 0;
    let nbPhotoDomStart = 0;

    // ** GESTION BLOCS PHOTOS **
    // AJAX envoie et récupère les infos
    function sendAjax(data){
      fetch(ajaxurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        },            
        body: data,
      })
      .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la requête fetch');
          }
          return response.json();
        })
      .then(body => {
        if (!body.success) {
          alert(response.data);
          return;            
        }
        
        // on concatene le résultat envoyé par la requete pour avoir toutes les photos
        if(photos.length == 0){
          photos = body.data.custom_posts;
        }else{
          photos = photos.concat(body.data.custom_posts)
        }
        // sinon erreur : ne trouve pas les élements qui n'existe pas et arrête le script
        try {
          generateBlocsPhotos() // Appel de la fonction avec les données des custom posts
        } catch (error) {
          console.log("Erreur generatebloc", error)
        }
        
        // Pour supprimer le bouton charger plus quand il n'y a plus de posts
        maxPages = body.data.maxPages
        if (currentPageNb >= maxPages) {
          $(".btn__wrapper").hide();
        }else{
        $(".btn__wrapper").show();
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête Ajax :', error);
      });
    }

    // Charger le bon tableau de photos
    function loadAndFilterCustomPosts() {
      const customPostButton = document.querySelector('.js-load-custom-posts');
      if (customPostButton) {
          customPostButton.click();
      };

      data.append('action', 'recuperer_custom_posts');
      const nonce = $('.js-load-custom-posts').data('nonce');
      data.append('nonce', nonce);

      const postid = $('.js-load-custom-posts').data('postid');
      if (postid != undefined) {
        data.append('postid', postid);
      };

      const nbPost = $('.js-load-custom-posts').data('posts');
      data.append('posts', nbPost); 

      data.append('paged', currentPageNb);

      var category = '';
      if ($('.cat-list').val()) {
        var category = $('.cat-list').val();
      } 
      // Vérifier si $('.js-load-custom-posts').data('category') existe
      else if($('.js-load-custom-posts').data('category')) {
        category = $('.js-load-custom-posts').data('category');
      } 
      // Si aucune valeur n'existe
      else {
        category = '';
      }
      if (category != undefined) {
        data.append('category', category);
      }

      var format = $('.format-list').val()
      if (format != undefined) {
        data.append('format', format);
      }

      var order = $('.order-list').val()
      if (order != undefined) {
        data.append('order', order);
      };

      sendAjax(data);
    };

    // Fonction pour générer les blocs photos dans le DOM à partir des données récupérées
    function generateBlocsPhotos() {

      nbPhotoDom = nbPhotoDom + 8;
      
      for (var i = nbPhotoDomStart; i < nbPhotoDom; i++) {
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
        imageElement.classList.add('photo-item');
        
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

              // Affichage overlay informations
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
        fullScreenUrl.onclick = openLighbox(i);

      };

        
    };

    // Chargement des posts au chargement de la page
    loadAndFilterCustomPosts()
    
    // ** LIGHTBOX ** 
    const popup = document.querySelector(".lightbox-wrapper ");

    // ouverture de la lightbox
    function openLighbox(i){
      var fullscreenIcons = document.querySelectorAll(".fullscreen");

      // Attachement de l'événement onclick à chaque icône fullscreen
      fullscreenIcons.forEach(function(fullscreenIcon) {
        fullscreenIcon.onclick = function(event) {
          var contactItems = document.querySelectorAll(".block-photo");
          contactItems.forEach(function (contactItem, index) {
            if (contactItem.contains(event.target)) {
              slideActive = index;
              return;
            }
          });
          event.preventDefault()
          popup.style.display = "block";
          imageLightbox.src = photos[slideActive]["image_url"];
          pReference.textContent = photos[slideActive]["reference"];
          pCategory.textContent = photos[slideActive]["categorie"];      
        }
      })
    };

    // Navigation dans la lightbox
    let imageLightbox = document.querySelector('.lightbox .photo-full')
    let pReference = document.querySelector('.lightbox-property .reference');
    let pCategory = document.querySelector('.lightbox-property .category');
    let arrowLeft = document.querySelector(".previous-container")
    let arrowRight = document.querySelector(".next-container")

    arrowLeft.onclick = function () {
      console.log("previous")
      changeSlide(-1)	 
    };
    arrowRight.onclick = function () {
      console.log("next")
      changeSlide(1)
    };
    
    function changeSlide(direction) {
      slideActive = slideActive + direction;
      // pour gérer les points à l'extrémité et défilement continue
      if (slideActive < 0)
        slideActive = photos.length - 1;
      if (slideActive > photos.length - 1)
        slideActive = 0;
      
      // Image séléctionnée
      console.log("src", photos[slideActive]["image_url"]);
      imageLightbox.src = photos[slideActive]["image_url"];
      imageLightbox.alt = photos[slideActive]["caption"];

              // Référence de la photo
      pReference.textContent = photos[slideActive]["reference"];

            // Catégorie de la photo
      pCategory.textContent = photos[slideActive]["categorie"];
              
    }

    // Fermeture de la lightbox
    let closeButton = document.querySelector(".close")
    closeButton.onclick = function () {
      popup.style.display = "none";
    };


    // ** CHARGER PLUS **
    $('#load-more').on('click', function(event) {
      event.preventDefault();
      // On incrémente currentPage de 1, car nous voulons charger la page suivante
      currentPageNb++; 
      nbPhotoDomStart = nbPhotoDom;
      loadAndFilterCustomPosts()
    });

    // ** FILTRER **
    $('.cat-list, .format-list, .order-list').on('change', function(event) {
      photos = [];
      nbPhotoDomStart = 0;
      nbPhotoDom = 0;
      // Mise à jour de la page
      currentPageNb = 1;
      data.append('paged', currentPageNb);
      // Vider la page
      var container = document.getElementById('similar-photos').querySelector('.photos');
      container.innerHTML = '';    
      event.preventDefault();
      loadAndFilterCustomPosts();
    });
      
  });
})(jQuery);