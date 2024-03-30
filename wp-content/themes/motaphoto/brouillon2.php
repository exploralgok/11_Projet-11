        <div class=similar-photos-v2 id=similar-photos-v2>
            <h2 class="subtitle">Vous aimeriez AUSSI</h2>

            <button
                            class="js-load-custom-posts"
                            data-postid="<?php echo get_the_ID(); ?>"
                            data-nonce="<?php echo wp_create_nonce('recuperer_custom_posts'); ?>"
                            data-action="recuperer_custom_posts"
                            data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
                            <img class="icon fullscreen" src= "<?php echo get_template_directory_uri() . '/assets/images/Icon_fullscreen.png';?>" alt="">
            </button>

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
                    <!-- informations survol -->
                    <div class="block-overlay">
                        <button
                            class="js-load-comments"
                            data-postid="<?php echo get_the_ID(); ?>"
                            data-nonce="<?php echo wp_create_nonce('capitaine_load_comments'); ?>"
                            data-action="capitaine_load_comments"
                            data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
                            <img class="icon fullscreen" src= "<?php echo get_template_directory_uri() . '/assets/images/Icon_fullscreen.png';?>" alt="">
                        </button>

                        <a href="<?php echo get_permalink() ?>" ><img class="icon eye" src= "<?php echo get_template_directory_uri() . '/assets/images/Icon_eye.png';?>" alt=""></a>
                        <p class="block-property category"> <?php echo $category_name; ?> </p>
                        <p class="block-property reference"> <?php echo get_post_meta( get_the_ID(), 'reference', true ); ?> </p>
                    </div>
                </div>

                <?php
                endwhile;
                endif;

                // 4. On réinitialise à la requête principale (important)
                wp_reset_postdata();

                ?>
            </div>
        </div>


        