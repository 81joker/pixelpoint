      <!-- Header Section Begin -->
      <header class="header-section">
        <div class="container">
            <div class="logo">
            <?php 
                        if( has_custom_logo() ){
                            the_custom_logo();
                        }else{
                            ?>
                                <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><span><?php bloginfo( 'name' ); ?></span></a>
                            <?php
                        }
                        ?>
            </div>
            <div class="nav-menu">
                <nav class="mainmenu mobile-menu">
                    <ul>
                        <li <?php echo ($_SERVER['REQUEST_URI'] == '/') ? 'class="active"' : ''; ?>><a  href="<?php echo site_url('/') ?>">Home</a></li>
                        <li <?php echo ($_SERVER['REQUEST_URI'] == '/events/') ? 'class="active"' : ''; ?> ><a  href="<?php echo site_url('/events') ?>"  >Events</a></li>
                        <li <?php echo ($_SERVER['REQUEST_URI'] == '/about/') ? 'class="active"' : ''; ?> > <a href="<?php echo site_url('/about') ?>" >About</a></li>
                        <li <?php echo ($_SERVER['REQUEST_URI'] == '/services/') ? 'class="active"' : ''; ?> > <a href="<?php echo site_url('/services') ?>" >Services</a></li>
                        <li><a href="#">Contacts</a></li>
                    </ul>
                </nav>
                <a href="#" class="primary-btn top-btn">
                    <i class="fa fa-search"></i>
                </a>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
    <!-- Header End -->
