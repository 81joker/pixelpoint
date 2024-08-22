  <!-- ***** Main Banner Area Start ***** -->
  <section class="section main-banner" id="top" data-section="section1">

    <?php
    $hero_title = get_theme_mod('set_hero_title', __('Please, type some title', 'pixelpoint'));
    $hero_subtitle = get_theme_mod('set_hero_subtitle', __('Please, type some subtitle', 'pixelpoint'));
    $hero_text = get_theme_mod('set_hero_text', __('Please, type some Text', 'pixelpoint'));
    $hero_button_link = get_theme_mod('set_hero_button_link', '#');
    $hero_button_text = get_theme_mod('set_hero_button_text', __('Learn More', 'pixelpoint'));
    // $hero_height = get_theme_mod( 'set_hero_height', 800 ); to do size image hero 
    $hero_background = wp_get_attachment_url(get_theme_mod('set_hero_background'));
    $hero_background_id = get_theme_mod('set_hero_background');
    $hero_background_mime = get_post_mime_type($hero_background_id);
    ?>
    <!-- Hero Section Begin -->
    <section class="hero-section set-bg" data-setbg="<?php echo esc_url($hero_background) ?>">

        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <div class="hero-text py-5">
                        <span><?php echo nl2br( esc_html( $hero_subtitle ) ); ?></span>
                        <h2><?php echo esc_html( $hero_title ); ?></h2>
                        <p><?php echo nl2br( esc_html( $hero_text) ); ?></p>
                        <a href="#" class="primary-btn">Buy Ticket</a>
                    </div>
                </div>
                <div class="col-lg-5">
                    <img src="img/hero-right.png" alt="">
                </div>
            </div>
        </div>
    </section>
    <!-- Hero Section End -->