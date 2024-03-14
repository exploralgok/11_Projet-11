</div><!-- .site-content -->

<footer id="colophon" class="site-footer" role="contentinfo">

    <?php 
        wp_nav_menu ( array (
            'theme_location' => 'footer-menu' ,
            'menu_class' => 'menu-footer', 
        ) ); 
    ?>

</footer><!-- .site-footer -->

</div><!-- .site -->

<?php wp_footer(); ?>
</body>

</html>