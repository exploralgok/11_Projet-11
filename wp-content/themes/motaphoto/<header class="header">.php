<header class="header">
    <div class="header_container" id="site-navigation">
        <div class="logo">
            <a href="<?php echo home_url('/'); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="Logo">
            </a>
        </div>

        <!-- menu burger -->
        <div class="burgerMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>

        <!-- Navigation (Menu) -->
            <?php
                wp_nav_menu(array(
                    'theme_location' => 'header-menu',
                    'menu_class' => 'header-menu', // classe CSS pour customiser mon menu
                ));
            ?>
        </nav>
    </div>
</header>
