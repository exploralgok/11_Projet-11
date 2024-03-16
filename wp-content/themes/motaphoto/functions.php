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

