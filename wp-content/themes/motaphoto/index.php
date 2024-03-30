<?php get_header(); ?>

<div class="hero">
    <h1 class="hero__title">PHOTOGRAPHE EVENT</h1>

     <!-- Récupérer une image héros aléatoire -->

    <?php
    $args = array(
        'post_type' => 'hero_images',
        'posts_per_page' => 1,
        'orderby' => 'rand', // Pour obtenir un post aléatoire
    );

    $hero_query = new WP_Query($args);

    if ($hero_query->have_posts()) :
        while ($hero_query->have_posts()) : $hero_query->the_post();
            // Afficher l'image héros
            if (has_post_thumbnail()) {
                the_post_thumbnail('full'); // Utiliser la taille 'full' pour afficher l'image en pleine taille
            }
        endwhile;
    endif;
    wp_reset_postdata();
    ?>

    <img class="hero__img" src="<?php echo get_permalink() ?>" alt="">


</div>

<div class=container>
    <div class= filter> </div>

    <!-- replacer par un template -->
        <div class="similar-photos" id=similar-photos>
            <div class=photos></div>
    </div>

    <div class="btn__wrapper">
        <a href="#!" class="btn btn__primary js-load-custom-posts" id="load-more">Load more</a>
        </div>


</div>
        
<?php get_footer(); ?>