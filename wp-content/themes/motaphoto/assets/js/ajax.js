(function ($) {
  $(document).ready(function () {

    let photos = [];
    let maxPages;
    let currentPageNb = 1;
    const data = new URLSearchParams();
    var container = document.getElementById('similar-photos').querySelector('.photos');
    let nbPhotoDom = 0;
    let nbPhotoDomStart = 0;

    function sendAjax(data){
      console.log("ajax send")
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
        
        // photos = body.data.custom_posts;

        if(photos.length == 0){
          console.log("arr vide")
          photos = body.data.custom_posts;
        }else{
          console.log("arr exist")
          photos = photos.concat(body.data.custom_posts)
        }

        console.log(photos)
        try {
          genererBlocsPhotos() // Appel de la fonction avec les données des custom posts
        } catch (error) {
          console.log("Erreur generatebloc", error)
        }
        
        maxPages = body.data.maxPages
        console.log("after max ajax", maxPages)
        console.log("after current ajax", currentPageNb)

        if (currentPageNb >= maxPages) {
          console.log("work")
          console.log("currentPageNb", currentPageNb)
          console.log("maxPages", maxPages)
          $(".btn__wrapper").hide();
        }else{
        console.log("dont work")
        console.log("currentPageNb", currentPageNb)
        console.log("maxPages", maxPages)
        $(".btn__wrapper").show();
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête Ajax :', error);
      });
    }

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
        console.log("catégorie load", category)
      }else{
        console.log("cat n'existe pas")
      };

      var format = $('.format-list').val()
      if (format != undefined) {
        data.append('format', format);
        console.log("format load", format)
      }else{
        console.log("format n'existe pas")
      };

      var order = $('.order-list').val()
      if (order != undefined) {
        data.append('order', order);
        console.log("order load", order)
      };

      sendAjax(data);
    };

    // Fonction pour charger les custom posts au chargement de la page

    // Fonction pour générer les blocs photos dans le DOM à partir des données récupérées
    function genererBlocsPhotos() {

      nbPhotoDom = nbPhotoDom + 8;
      
      for (var i = nbPhotoDomStart; i < nbPhotoDom; i++) {

        console.log(i)
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

    // Appeler la fonction pour charger les custom posts au chargement de la page

    loadAndFilterCustomPosts()

    //////////////////////// 
    
    // ouverture  lightbox
    const popup = document.querySelector(".lightbox-wrapper ");

    function openLighbox(i){
      var fullscreenIcons = document.querySelectorAll(".fullscreen");

      // Attachement de l'événement onclick à chaque icône fullscreen
      fullscreenIcons.forEach(function(fullscreenIcon) {
        fullscreenIcon.onclick = function(event) {

          var contactItems = document.querySelectorAll(".block-photo");
          console.log(contactItems)
          contactItems.forEach(function (contactItem, index) {
            console.log("contactItem", contactItem)
            if (contactItem.contains(event.target)) {
              slideActive = index;
              return;
            }
          });

          event.preventDefault()
          popup.style.display = "block";
          console.log('slideActive', slideActive)
          console.log('photos', photos)
          imageLightbox.src = photos[slideActive]["image_url"];
          pReference.textContent = photos[slideActive]["reference"];
          pCategory.textContent = photos[slideActive]["categorie"];      
        }
      })
    };


    // let slideActive = 0;
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
      console.log('avant', slideActive)
      slideActive = slideActive + direction;
      console.log('après', slideActive)
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

    let closeButton = document.querySelector(".close")

    closeButton.onclick = function () {
      console.log("close")
      popup.style.display = "none";
    };


      // Charger +

    $('#load-more').on('click', function(event) {
      console.log("charger plus")
      event.preventDefault();
      // On incrémente currentPage de 1, car nous voulons charger la page suivante
      console.log("before load more currentPageNb", currentPageNb)
      console.log("before load more maxPages", maxPages)
      currentPageNb++; 
      console.log("after load more currentPageNb", currentPageNb)
      console.log("after load more maxPages", maxPages)
      nbPhotoDomStart = nbPhotoDom;
      loadAndFilterCustomPosts()
    });


    $('.cat-list, .format-list, .order-list').on('change', function(event) {

      console.log('change fitler')
      photos = [];
      nbPhotoDomStart = 0;
      nbPhotoDom = 0;

      console.log('avant currentPageNb', currentPageNb)
      currentPageNb = 1;
      console.log('après currentPageNb', currentPageNb)
      data.append('paged', currentPageNb);

      var container = document.getElementById('similar-photos').querySelector('.photos');
      container.innerHTML = '';    

      event.preventDefault();
      loadAndFilterCustomPosts();
    });
      
  });
})(jQuery);