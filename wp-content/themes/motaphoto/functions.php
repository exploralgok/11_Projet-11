<?php

 add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );
 function theme_enqueue_scripts() {
    // chargement css
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/assets/css/main.css'
    );

    // chargement js
    wp_enqueue_script('jquery');
    wp_enqueue_script( 'custom-script', get_template_directory_uri() . '/assets/js/custom.js', ["jquery"]);
    wp_enqueue_script( 'ajax-script', get_template_directory_uri() . '/assets/js/ajax.js', ["jquery"]);

    $translation_array = array( 'templateUrl' => get_template_directory_uri() );
    //after wp_enqueue_script
    wp_localize_script( 'custom-script', 'object_name', $translation_array );
    wp_localize_script( 'ajax-script', 'object_name', $translation_array );

    // Passer l'URL Ajax depuis PHP vers JavaScript
    wp_localize_script('custom-script', 'ajaxurl', array(admin_url( 'admin-ajax.php' )) );
    wp_localize_script('ajax-script', 'ajaxurl', array(admin_url( 'admin-ajax.php' )) );


    $page = '';

    if ( is_singular( 'photo' ) ) {
        // Définir la variable page pour la page de photo unique
        $page = 'single-photo';
    } elseif ( is_home() || is_front_page() ) {
        // Définir la variable page pour la page d'accueil ou la page statique d'accueil
        $page = 'index';
    }

    // Utiliser wp_localize_script pour passer la variable page à votre script
    wp_localize_script( 'ajax-script', 'vars', array(
        'page' => $page
    ) ); 


 }

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

// gestion des images à la une 
// add_theme_support( 'post-thumbnails' );

// Emplacement des menus
add_action( 'init', 'register_my_menus' );
function register_my_menus() {
    register_nav_menus(
        array(
            'header-menu' => __( 'Menu Header' ),
            'footer-menu' => __( 'Menu Footer' ),
            )
    );
  }

  // problème upload image large
  add_filter( 'big_image_size_threshold', '__return_false' );

  function wpb_image_editor_default_to_gd( $editors ) {
    $gd_editor = 'WP_Image_Editor_GD';
    $editors = array_diff( $editors, array( $gd_editor ) );
    array_unshift( $editors, $gd_editor );
    return $editors;
}
add_filter( 'wp_image_editors', 'wpb_image_editor_default_to_gd' );

// ajax lightbox

// add_action( 'wp_ajax_capitaine_load_comments', 'capitaine_load_comments' );
// add_action( 'wp_ajax_nopriv_capitaine_load_comments', 'capitaine_load_comments' );

// function capitaine_load_comments() {
  
// 	// Vérification de sécurité
//   	if( 
// 		! isset( $_REQUEST['nonce'] ) or 
//        	! wp_verify_nonce( $_REQUEST['nonce'], 'capitaine_load_comments' ) 
//     ) {
//     	wp_send_json_error( "Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
//   	}
    
//     // On vérifie que l'identifiant a bien été envoyé
//     if( ! isset( $_POST['postid'] ) ) {
//     	wp_send_json_error( "L'identifiant de l'article est manquant.", 400 );
//   	}

//   	// Récupération des données de la photo
//   	$post_id = intval( $_POST['postid'] );
//     // Configuration de $post pour qu'il puisse être utilisé avec get_next_post()
//     $post = get_post($post_id); 
//     setup_postdata($post); 
//     var_dump($post);

//     $category_name = sanitize_text_field(get_the_category($post_id)[0]->cat_name);
//     $reference = sanitize_text_field(get_post_meta($post_id, 'reference', true ));
//     $featured_img_url = get_the_post_thumbnail_url($post_id,'full');

//     // Préparez le contenu HTML lightbox content
//     $html_content_lightbox = '<img class=photo-full src="' . $featured_img_url . '" alt="">';
//     $html_content_lightbox_property = '<p class="block-property reference">' . $reference . '</p>';
//     $html_content_lightbox_property .= '<p class="block-property category">' . $category_name . '</p>';

//     // Récupérer le post précédent / suivant
//     // ne fonctionne pas
//     $next_post = get_next_post();
//     var_dump($next_post);
//     $next_post_url = $next_post ? get_permalink($next_post->ID) : '';
//     var_dump($next_post_url);

//     // Vérifier si le post suivant existe
//     if ($next_post_url) {
//         // Préparez le contenu HTML lightbox suivant
//         $html_content_next_post = '<a href="' . $next_post_url . '">Voir le prochain post</a>';
//     } else {
//         $html_content_next_post = ''; // Si le post suivant n'existe pas, laissez le contenu vide
//     }

//    // Préparez le contenu HTML lightbox previous
//     // $html_content_autre_div = '<a class="previous-link" href="' . get_permalink($previous_post_id) . '"</a>';

//     // // Envoyer les données au navigateur
//       wp_send_json_success( array(
//           'lightbox_content' => $html_content_lightbox,
//           'lightbox_content_property' => $html_content_lightbox_property,
//           'lightbox_next_post_url' => $html_content_next_post,
//           'autre_div_content' => $html_content_autre_div,
//       ) );
// }


// V2 AJAX

add_action( 'wp_ajax_recuperer_custom_posts', 'recuperer_custom_posts' );
add_action( 'wp_ajax_nopriv_recuperer_custom_posts', 'recuperer_custom_posts' );

function recuperer_custom_posts() {
	// Vérification de sécurité (pour l'avoir sur les 2 pages)
    // if( 
	// 	! isset( $_REQUEST['nonce'] ) or 
    //    	! wp_verify_nonce( $_REQUEST['nonce'], 'recuperer_custom_posts' ) 
    // ) {
    // 	wp_send_json_error( "Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
  	// }

    // Définir les arguments par défaut
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1,
        'category_name' => array(),
        'post__not_in' => array(),
        'paged' => $_POST['paged'],

    );

    // filte cat 
    $category_name = sanitize_text_field( $_POST['category'] );

    // Déterminer la page actuelle
    $current_page = ''; // Initialisation de la variable



    // Modifier les arguments en fonction de la page concernée
     if ($_POST['page'] === 'single-photo') {
         $args['category_name'] = $category_name;
         $args['post__not_in'] = array($_POST['post_id']);
         $args['posts_per_page'] = 2;
     } elseif ($_POST['page'] === 'index') {
         $args['posts_per_page'] = 8;
     }

    // if (is_singular( 'photo' )) { // Si c'est une page de post unique
    //     $current_page = 'single-photo';
    //     $args['category_name'] = $category_name;
    //     $args['post__not_in'] = array($_POST['postid']);
    //     $args['posts_per_page'] = 2;
    // } elseif (is_home() || is_front_page()) { // Si c'est la page d'accueil
    //     $current_page = 'index';
    //     $args['posts_per_page'] = 8;
    // }

    
    $query = new WP_Query($args);

    $custom_posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            // Récupérer les données pertinentes des custom posts
            $custom_post_data = array(
                'image_url' => get_the_post_thumbnail_url(),
                'post_url' => get_post_permalink(),
                'caption' => get_the_title(),
                'reference' => get_post_meta( get_the_ID(), 'reference', true ),
                'categorie' => get_the_category()[0]->cat_name,
                    );

            array_push($custom_posts, $custom_post_data);
        }
    }

    wp_reset_postdata();

    // Utilisez un tableau pour stocker les données adaptées en fonction de la page actuelle
    $localized_data = array(
        'custom_posts' => $custom_posts,
        'current_page' => $current_page,
    );
    
    wp_send_json_success($custom_posts);
    //wp_send_json_success($localized_data);
 
    wp_die();

    var_dump($custom_posts);


}


function weichie_load_more() {
    $ajaxposts = new WP_Query([
      'post_type' => 'photo',
      'posts_per_page' => 8,
      'paged' => $_POST['paged'],
    ]);
  
    $response = '';
  
    if($ajaxposts->have_posts()) {
      while($ajaxposts->have_posts()) : $ajaxposts->the_post();
        $response .= '<h2>' . the_title(). '</h2>';
      endwhile;
    } else {
      $response = '';
    }
  
    echo $response;
    exit;
  }
  add_action('wp_ajax_weichie_load_more', 'weichie_load_more');
  add_action('wp_ajax_nopriv_weichie_load_more', 'weichie_load_more');