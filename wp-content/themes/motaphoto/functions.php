<?php

 add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );
 function theme_enqueue_scripts() {
     // chargement css
       //css compilé
       wp_enqueue_style(
            'parent-style', 
            get_template_directory_uri() . '/assets/css/main.css'
);
 }

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

// Emplacement des menus
function register_my_menus() {
    register_nav_menus(
        array(
            'header-menu' => __( 'Menu Header' ),
            'footer-menu' => __( 'Menu Footer' ),
            )
    );
  }
  add_action( 'init', 'register_my_menus' );