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
        <header id="masthead" class="site-header" role="banner">
            <!-- nav -->
            <div class=nav-wrapper>
                <a href="<?php echo get_home_url(); ?>">
                    <img class="nav-wrapper__logo" src="<?php echo get_template_directory_uri() . '/assets/images/Logo (2).png'; ?>" alt="">
                </a>
                    
                    <!-- menu mobile -->
                    <input id="toggle" type="checkbox"></input>
                    <label for="toggle" class="hamburger">
                        <div class="top-bun"></div>
                        <div class="meat"></div>
                        <div class="bottom-bun"></div>
                    </label>

                    <!-- menu desktop menu header container-->
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