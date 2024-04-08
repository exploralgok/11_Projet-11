</div><!-- .site-content -->

<footer id="colophon" class="site-footer" role="contentinfo">

    <div class=footer-wrapper>
    <?php 
        wp_nav_menu ( array (
            'theme_location' => 'footer-menu' ,
            'menu_class' => 'menu-footer', 
        ) ); 
    ?>

    <div class="footer-item">Tous droits réservés</div>
    </div>

    <!-- Pop up contact -->
    <?php get_template_part( '/template-parts/contact' ); ?>

    <!-- Lightbox -->
    <?php get_template_part( '/template-parts/lightbox' ); ?>

    </div>
</footer><!-- .site-footer -->

</div><!-- .site -->

<?php wp_footer(); ?>
</body>

</html>