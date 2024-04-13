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
            <div class=header>
                <div class="nav-bar desktop">
                    <a href="<?php echo get_home_url(); ?>">
                        <img class="nav-bar__logo"
                            src="<?php echo get_template_directory_uri() . '/assets/images/Logo (2).png'; ?>" alt="">
                    </a>
                    <div class="nav-bar__menu">
                        <?php 
                        // menu header container
                            wp_nav_menu ( 
                                array (
                                'theme_location' => 'header-menu' ,
                                'menu_class' => 'nav-bar__links desktop', 
                                'container' => 'nav'
                                )
                            ); 
                        ?>
                        <div class="nav-bar__links mobile">
                            <div class="top-bun"></div>
                            <div class="meet"></div>
                            <div class="bottom-bun"></div>
                        </div>
                    </div>
                </div>
                <div class="header mobile">
                    <div class="nav-bar mobile">
                        <a href="<?php echo get_home_url(); ?>">
                            <img class="nav-bar__logo"
                                src="<?php echo get_template_directory_uri() . '/assets/images/Logo (2).png'; ?>" alt="">
                        </a>
                        <div class="nav-bar__links mobile">
                            <div class="top-bun"></div>
                            <div class="meat"></div>
                            <div class="bottom-bun"></div>
                        </div>
                    </div>
                    <div class="menu-container">
                        <div class="nav-bar__menu">
                            <?php 
                        // menu header container
                            wp_nav_menu ( 
                                array (
                                'theme_location' => 'header-menu' ,
                                'menu_class' => 'nav-bar__links', 
                                'container' => 'nav'
                                )
                            ); 
                        ?>             
                        </div>
                    </div>
                </div>
            </div>
        </header><!-- .site-header -->
        <div id="content" class="site-content">