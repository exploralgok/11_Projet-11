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

            <!-- Photos apparentés -->
            <!-- Affichage des photos -->
        <div class=similar-photos>
            <h2 class="subtitle">Vous aimeriez AUSSI</h2>
            <div class=photos>

                <?php 
                // 1. On définit les arguments pour définir ce que l'on souhaite récupérer

                $category_name = get_the_category()[0]->cat_name;
                $post_id = get_the_ID();
                
                
                $args = array(
                    'post_type' => 'photo',
                    'category_name' => $category_name,
                    'posts_per_page' => 2,
                    'post__not_in' => array($post_id),
                );

                // 2. On exécute la WP Query
                $my_query = new WP_Query( $args );

                // 3. On lance la boucle !
                if( $my_query->have_posts() ) : while( $my_query->have_posts() ) : $my_query->the_post();
            
                ?>
            
                <div class="block-photo">
                    <?php the_post_thumbnail('large', ['class' => 'photo-item']); ?>
                    <div class="block-overlay">
                        <img class="icon fullscreen" src= "<?php echo get_template_directory_uri() . '/assets/images/Icon_fullscreen.png';?>" alt="">
                        <a href="<?php echo get_permalink() ?>" ><img class="icon eye" src= "<?php echo get_template_directory_uri() . '/assets/images/Icon_eye.png';?>" alt=""></a>
                        <p class="block-property category"> <?php echo $category_name; ?> </p>
                        <p class="block-property reference"> <?php echo get_post_meta( get_the_ID(), 'reference', true ); ?> </p>
                    </div>
                </div>

                <!-- informations survol -->
                <!-- oeil -->



                <?php
                endwhile;
                endif;

                // 4. On réinitialise à la requête principale (important)
                wp_reset_postdata();

                ?>
            </div>
        </div>
        
        <?php
        // End the loop (principale).
        endwhile;
        ?>
    </main><!-- .site-main -->
</div><!-- .content-area -->

<?php get_footer(); ?>