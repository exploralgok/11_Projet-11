<?php 
get_header(); ?>
 
    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
 
        <?php
        // Start the loop.
        while ( have_posts() ) : the_post();?>
    
        <!-- Titre Natif -->
        <h1><?php the_title(); ?></h1>
        <!-- Référence ACF -->
        <?php echo get_post_meta( get_the_ID(), 'reference', true ); ?>
        <!-- Catégorie Natif -->
        <?php the_category(); ?>
        <!-- Format CPT UI -->
        <?php the_terms( get_the_ID() , 'format' ); ?>        
        <!-- Type ACF -->
        <?php echo get_post_meta( get_the_ID(), 'type', true ); ?>
        <!-- Année Natif -->
        <?php the_time( 'Y' ); ?>
        <!-- Photo Natif -->
        <?php the_post_thumbnail(); ?>

        <!-- Navigation -->
        <?php
        // Replace the image URLs with your actual arrow image URLs
        $previous_arrow_image_url = get_template_directory_uri() . '/assets/images/Line 6.png';
        $next_arrow_image_url = get_template_directory_uri() . '/assets/images/Line 7.png';

        // Custom format strings for previous and next post links with arrow images
        $previous_link_format = '<img src="' . $previous_arrow_image_url . '" alt="Previous Post" />';
        $next_link_format = '<img src="' . $next_arrow_image_url . '" alt="Next Post" />';
        
        // Suivant 
        next_post_link('%link', $next_link_format);
        $next_post = get_next_post();
        echo get_the_post_thumbnail( $next_post, [ 100, 100 ] ); 

        // Précédent
        previous_post_link('%link', $previous_link_format);
        $previous_post = get_previous_post();
        echo get_the_post_thumbnail( $previous_post, [ 100, 100 ] ); 

        ?>

        <?php
        // End the loop.
        endwhile;
        ?>
 
        </main><!-- .site-main -->
    </div><!-- .content-area -->
 
<?php get_footer(); ?>