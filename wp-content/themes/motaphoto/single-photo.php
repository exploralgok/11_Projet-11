<?php 
get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

        <?php
        // Start the loop.
        while ( have_posts() ) : the_post();?>

        <div class="content-wrapper">
            <div class="content">
                <div class="content-info">
                    <h1 class="title"> <?php the_title(); ?></h1>
                    <p class="property">Référence : <span id="reference-value"><?php echo get_post_meta( get_the_ID(), 'reference', true ); ?></span></p>
                    <p class="property">Catégorie : <?php echo get_the_category()[0]->cat_name; ?></p>
                    <p class="property">Format : <?php echo get_the_terms( get_the_ID() , 'format' )[0]->name; ?> </p>
                    <p class="property">Type : <?php echo get_post_meta( get_the_ID(), 'type', true ); ?></p>
                    <p class="property">Année : <?php the_time( 'Y' ); ?></p>
                </div>
                <!-- div ou directement image? -->
                <div class="content-photo">
                    <?php echo the_post_thumbnail(); ?>
                </div>
            </div>
            <div class="interact">
                <div class="interact-contact">
                    <p class="text">Cette photo vous intéresse ?</p>
                    <button class="grey-btn popup-contact">Contact</button>
                </div>
                <div class="interact-nav">
                    <?php
                    // Replace the image URLs with your actual arrow image URLs
                    $previous_arrow_image_url = get_template_directory_uri() . '/assets/images/Line 6.png';
                    $next_arrow_image_url = get_template_directory_uri() . '/assets/images/Line 7.png';

                    // Custom format strings for previous and next post links with arrow images
                    $previous_link_format = '<img src="' . $previous_arrow_image_url . '" alt="Previous Post" />';
                    $next_link_format = '<img src="' . $next_arrow_image_url . '" alt="Next Post" />';
                    ?>

                    <div class="previous-wrapper">
                        <div class="thumbnail">
                            <?php 
                            $previous_post = get_previous_post();
                            echo get_the_post_thumbnail( $previous_post, [ 100, 100 ] ); 
                            ?>
                        </div>
                        <div class="arrow">
                            <?php previous_post_link('%link', $previous_link_format); ?>
                        </div>
                    </div>
                    <div class="next-wrapper">
                        <div class="thumbnail">
                            <?php 
                            $next_post = get_next_post();
                            echo get_the_post_thumbnail( $next_post, [ 100, 100 ] ); 
                            ?>
                        </div>
                        <div class="arrow">
                            <?php next_post_link('%link', $next_link_format); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <?php
        // End the loop.
        endwhile;
        ?>

    </main><!-- .site-main -->
</div><!-- .content-area -->

<?php get_footer(); ?>