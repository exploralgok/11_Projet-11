<?php

add_action( 'wp_ajax_recuperer_custom_posts', 'recuperer_custom_posts' );
add_action( 'wp_ajax_nopriv_recuperer_custom_posts', 'recuperer_custom_posts' );

function recuperer_custom_posts() {
	// Vérification de sécurité 
  // Définir les arguments par défaut

  // Afficher le bon nombre de photos sur les pages (2 pages | !=)
  // Définie dans le JS
  $posts_per_page = $_POST['posts']; 

  $args = array(
      'post_type' => 'photo',
      'posts_per_page' => $posts_per_page, 
      'paged' => $_POST['paged'],
  );

  // Exclure la photo affichée (single page)
  $post_id = $_POST['postid'];

  if (!empty($post_id)) {
    $args["post__not_in"] = array($post_id);
  }

  // Filtres categorie
    // définie par le filtre select de la page d'acceuil
  $catSlug = $_POST['category'];
    // définie par la variable du single post
  $category_name = sanitize_text_field( $_POST['category'] );

  if (!empty($catSlug) | !empty($category_name)) {
    $args['tax_query'][] = array(
        'taxonomy' => 'category',
        'field'    => 'slug',
        'terms'    => $catSlug,
    );
  }


  // filtre format
    // définie par le filtre select de la page d'acceuil
  $formatSlug = $_POST['format'];
    // définie par la variable du single post : pas nécessaire

  if (!empty($formatSlug)) {
    $args['tax_query'][] = array(
        'taxonomy' => 'format',
        'field'    => 'slug',
        'terms'    => $formatSlug,
    );
  }
  
  // filtre tri 
    // définie par le filtre select de la page d'acceuil
  $order = $_POST['order'];
    // définie par la variable du single post : pas nécessaire
  
  if (!empty($order)) {
    if ($order == 'asc') {
      $args["order"] = 'ASC';
    }
    if ($order == 'desc') {
      $args["order"] = 'DESC';
    }
  }

  // Query Go
  $query = new WP_Query($args);

  $custom_posts = array();
  // besoin de l'info pour cacher le bouton charger plus
  $max_pages = $query->max_num_pages;

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      // Récupérer les données pertinentes des custom posts
      $custom_post_data = array(
        'image_url' => get_the_post_thumbnail_url(),
        'post_url' => get_post_permalink(),
        'caption' => sanitize_text_field(get_the_title()),
        'reference' => get_post_meta( get_the_ID(), 'reference', true ),
        'categorie' => get_the_category()[0]->cat_name,
      );

      array_push($custom_posts,$custom_post_data);

    }

  }

  wp_reset_postdata();

    // Utilisez un tableau pour stocker les données adaptées en fonction de la page actuelle
  $localized_data = array(
      'custom_posts' => $custom_posts,
      'maxPages' => $max_pages,
  );
    
  wp_send_json_success($localized_data);

  wp_die();

}
