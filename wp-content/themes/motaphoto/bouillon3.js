(document).ready(function () {
    let photos = [];
    
    // Fonction pour charger les custom posts au chargement de la page index
    function chargerCustomPosts() {
        // Appeler la fonction pour charger les custom posts au chargement de la page
        chargerCustomPosts('index'); // Appel pour la page index
    }
    
    // Appeler la fonction pour charger les custom posts au chargement de la page
    chargerCustomPosts();
    
    // Gérer le chargement des custom posts pour la page single-photo
    $('.js-load-custom-posts').click(function (e) {
        e.preventDefault();
        const currentPage = $(this).data('page'); // Obtenir la page actuelle
        chargerCustomPosts(currentPage); // Appel de la fonction pour charger les custom posts en fonction de la page
    });

    // Fonction pour charger les custom posts en AJAX
    function chargerCustomPosts(currentPage) {
        // Récupérer les données nécessaires pour la requête AJAX
        const nonce = $('.js-load-custom-posts').data('nonce');
        const postid = $('.js-load-custom-posts').data('postid');
        const category = $('.js-load-custom-posts').data('category');

        const data = new URLSearchParams();
        data.append('action', 'recuperer_custom_posts');
        data.append('nonce', nonce);
        data.append('page', currentPage); // Ajouter le paramètre de page
        data.append('postid', postid);
        data.append('category', category);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: data,
        })
        .then(response => response.json())
        .then(body => {
            if (!body.success) {
                alert(response.data);
                return;
            }
            photos = body.data;
            genererBlocsPhotos(); // Appel de la fonction avec les données des custom posts
        })
        .catch(error => {
            console.error('Erreur lors de la requête Ajax :', error);
        });
    }
    
    // Fonction pour générer les blocs photos dans le DOM à partir des données récupérées
    function genererBlocsPhotos() {
        // Votre code pour générer les blocs photos ici
    }

});
