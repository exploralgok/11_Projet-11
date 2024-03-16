</div><!-- .site-content -->

<footer id="colophon" class="site-footer" role="contentinfo">

    <?php 
        wp_nav_menu ( array (
            'theme_location' => 'footer-menu' ,
            'menu_class' => 'menu-footer', 
        ) ); 
    ?>

    <!-- Pop up contact -->
    <?php get_template_part( '/template-parts/contact' ); ?>

    </div>
</footer><!-- .site-footer -->

</div><!-- .site -->

<?php wp_footer(); ?>
</body>

</html>