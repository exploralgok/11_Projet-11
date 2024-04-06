<?php get_header(); ?>

<div class="hero">
    <h1 class="hero__title">PHOTOGRAPHE EVENT</h1>
     <!-- Récupérer une image héros aléatoire -->     
        <?php
     $args = array(
      'post_type' => 'photo',
      'posts_per_page' => 1,
       'orderby' => 'rand', // Pour obtenir un post aléatoire
    );

    $hero_query = new WP_Query($args);

    if ($hero_query->have_posts()) :
        while ($hero_query->have_posts()) : $hero_query->the_post();
                $hero_img_url = get_the_post_thumbnail_url(); 
        endwhile;
    endif;
    ?>
        <img class="hero__img" src= <?php echo $hero_img_url ?> alt="">
</div>

<div class="gallery">
    <div class="gallery__filters"> 
        <div class="left-container">
            <div class=" gallery__filters-item filters__category"> 
                <?php $categories = get_categories(["exclude" => 1]); ?>
                <select class="dropdown cat-list">
                    <option value="">Catégories</option>
                    <?php
                        foreach ( $categories as $category ) :
                            ?><option class="cat-list_item" value="<?php echo $category->slug ?>"><?php echo $category->name ?></option><?php
                        endforeach;
                    ?>
                </select>
            </div>   
            <div class=" gallery__filters-item filters__format"> 
                <?php 
                $taxonomy = 'format';
                $formats = get_terms($taxonomy);  ?>
                <select class="dropdown format-list">
                        <option value="">Formats</option>
                        <?php
                            foreach ( $formats as $format ) :
                                ?><option class="format-list_item" data-slugFormat="<?= $format->slug; ?>" value="<?php echo $format->slug ?>"><?php echo $format->name ?></option><?php
                            endforeach;
                        ?>
                </select>
            </div>
        </div>
        <div class= " filters__orderby"> 
            <select class="dropdown order-list">
                <option >Trier par</option>
                <option class="order-list_item" value="desc">À partir des plus récentes</option>
                <option class="order-list_item" value="asc">À partir des plus anciennes</option>
            </select>
        </div>
    </div>

    <!-- replacer par un template -->
    <div class="gallery__photos similar-photos" id=similar-photos>
        <div class=photos></div>
    </div>

    <button
        data-posts=8
        class="btn__wrapper js-load-custom-posts"
    >
        <a href="#!" class="btn btn__primary" id="load-more">Charger plus</a>
    </button> 

</div>
        
<?php get_footer(); ?>