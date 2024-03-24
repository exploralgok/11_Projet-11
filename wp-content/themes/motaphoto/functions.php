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
    
    // Passer l'URL Ajax depuis PHP vers JavaScript
    // wp_localize_script('custom-script', 'ajax_object', array('ajaxurl' => admin_url('admin-ajax.php')));

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

add_action( 'wp_ajax_capitaine_load_comments', 'capitaine_load_comments' );
add_action( 'wp_ajax_nopriv_capitaine_load_comments', 'capitaine_load_comments' );

function capitaine_load_comments() {
  
	// Vérification de sécurité
  	if( 
		! isset( $_REQUEST['nonce'] ) or 
       	! wp_verify_nonce( $_REQUEST['nonce'], 'capitaine_load_comments' ) 
    ) {
    	wp_send_json_error( "Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
  	}
    
    // On vérifie que l'identifiant a bien été envoyé
    if( ! isset( $_POST['postid'] ) ) {
    	wp_send_json_error( "L'identifiant de l'article est manquant.", 400 );
  	}

  	// Récupération des données de la photo
  	$post_id = intval( $_POST['postid'] );
    $post = get_post($post_id); 
    setup_postdata($post); // Configuration de $post pour qu'il puisse être utilisé avec get_next_post()
    var_dump($post);

    $category_name = sanitize_text_field(get_the_category($post_id)[0]->cat_name);
    $reference = sanitize_text_field(get_post_meta($post_id, 'reference', true ));
    $featured_img_url = get_the_post_thumbnail_url($post_id,'full');
    // $featured_img = get_the_post_thumbnail($post_id);

    // Préparez le contenu HTML lightbox content
    $html_content_lightbox = '<img class=photo-full src="' . $featured_img_url . '" alt="">';
    $html_content_lightbox_property = '<p class="block-property reference">' . $reference . '</p>';
    $html_content_lightbox_property .= '<p class="block-property category">' . $category_name . '</p>';

    // $next_post_url = ;

    // Récupérer le post précédent 
    // ne fonctionne pas
    // Récupérer le post suivant
    $next_post = get_next_post();
    var_dump($next_post);
    $next_post_url = $next_post ? get_permalink($next_post->ID) : '';
    var_dump($next_post_url);

    // Vérifier si le post suivant existe
    if ($next_post_url) {
        // Préparez le contenu HTML lightbox suivant
        $html_content_next_post = '<a href="' . $next_post_url . '">Voir le prochain post</a>';
    } else {
        $html_content_next_post = ''; // Si le post suivant n'existe pas, laissez le contenu vide
    }

   // Préparez le contenu HTML lightbox previous
    // $html_content_autre_div = '<a class="previous-link" href="' . get_permalink($previous_post_id) . '"</a>';

    // // Envoyer les données au navigateur
      wp_send_json_success( array(
          'lightbox_content' => $html_content_lightbox,
          'lightbox_content_property' => $html_content_lightbox_property,
          'lightbox_next_post_url' => $html_content_next_post,
          'autre_div_content' => $html_content_autre_div,
      ) );
}