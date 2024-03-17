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