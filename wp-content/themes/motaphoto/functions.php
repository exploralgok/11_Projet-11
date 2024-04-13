<?php

foreach(glob(get_template_directory() . "/inc/*.php") as $file){
  require $file;
}

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

    //chargement select2
    wp_register_script( 'select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', ["jquery"]);
    wp_enqueue_script('select2');

    wp_register_style( 'select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css');
    wp_enqueue_style('select2');

    $translation_array = array( 'templateUrl' => get_template_directory_uri() );
    //after wp_enqueue_script
    wp_localize_script( 'custom-script', 'object_name', $translation_array );
    wp_localize_script( 'ajax-script', 'object_name', $translation_array );

    // Passer l'URL Ajax depuis PHP vers JavaScript
    wp_localize_script('custom-script', 'ajaxurl', array(admin_url( 'admin-ajax.php' )) );
    wp_localize_script('ajax-script', 'ajaxurl', array(admin_url( 'admin-ajax.php' )) );
 }

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

// encodning apostrophe
add_filter('run_wptexturize', '__return_false');

// gestion des images à la une 
add_theme_support( 'post-thumbnails' );

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


