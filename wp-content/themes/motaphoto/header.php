<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!--[if lt IE 9]>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <div id="page" class="hfeed site">
        <a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'twentyfifteen' ); ?></a>
        <header id="masthead" class="site-header" role="banner">
            <div class=nav-wrapper>
                <img class="nav-wrapper__logo" src="<?php echo get_template_directory_uri() . '/assets/images/Logo (2).png'; ?>" alt="">
                    <?php 
                        wp_nav_menu ( 
                            array (
                            'theme_location' => 'header-menu' ,
                            'menu_class' => 'menu-header', 
                            'container' => 'nav'
                            )
                    ); 
                    ?>
            </div>
        </header><!-- .site-header -->
        <div id="content" class="site-content">