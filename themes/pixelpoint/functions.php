<?php 


function pixelpoint_load_scripts(){

    //   Google Font 
    wp_enqueue_style( 'pixelpoint-google-fonts', '//fonts.googleapis.com/css?family=Work+Sans:400,500,600,700,800,900|Poppins:400,500,600,700&display=swap', array(), null );
    wp_enqueue_style('pixelpoint-googleapiss', '//fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');


    
    //  Css Styles
    wp_enqueue_style( 'pixelpoint-bootstrap-style',get_template_directory_uri() . '/assets/css/bootstrap.min.css' );
    wp_enqueue_style( 'pixelpoint-font-awesome-style',get_template_directory_uri() . '/assets/css/font-awesome.min.css' );
    wp_enqueue_style( 'pixelpoint-elegant-icons',get_template_directory_uri() . '/assets/css/elegant-icons.css' );
    // wp_enqueue_style( 'pixelpoint-template-style',get_template_directory_uri() . '/assets/css/owl.carousel.min.css' );
    // wp_enqueue_style( 'pixelpoint-template-style',get_template_directory_uri() . '/assets/css/magnific-popup.css' );
    // wp_enqueue_style( 'pixelpoint-template-style',get_template_directory_uri() . '/assets/css/slicknav.min.css' );
    // wp_enqueue_style( 'pixelpoint-style-sass',get_template_directory_uri() . '/assets/sass/style.sass' );
    wp_enqueue_style( 'pixelpoint-style-css',get_template_directory_uri() . '/assets/css/style.css' );



    // JavaScript Libraries
    // wp_enqueue_script('pixelpoint-ajax-js', '//ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js', array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-jquery', get_theme_file_uri('/assets/js/jquery-3.3.1.min.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-bootstrap-js', get_theme_file_uri('/assets/js/bootstrap.min.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-magnific-popup-js', get_theme_file_uri('/assets/js/jquery.magnific-popup.min.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-countdown-min-js', get_theme_file_uri('/assets/js/jquery.countdown.min.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-slicknav', get_theme_file_uri('/assets/js/jquery.slicknav.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-slicknav', get_theme_file_uri('/assets/js/jquery.slicknav.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-owlcarousel-js', get_theme_file_uri('/assets/js/owl.carousel.min.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('pixelpoint-main-js', get_theme_file_uri('/assets/js/main.js'), array('jquery'), '1.0', true);

}
add_action( 'wp_enqueue_scripts', 'pixelpoint_load_scripts' );

function pixelpoint_config(){

    register_nav_menus(
        array(
            'wp_devs_main_menu' => esc_html__( 'Main Menu', 'pixelpoint' ),
            'wp_devs_footer_menu' => esc_html__( 'Footer Menu', 'pixelpoint' )
        )
    );

    $args = array(
        'height'    => 225,
        'width'     => 1920
    );
    add_theme_support( 'custom-header', $args );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'width' => 200,
        'height'    => 110,
        'flex-height'   => true,
        'flex-width'    => true
    ) );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script' ));
    add_theme_support( 'title-tag' );

    // add_theme_support( 'align-wide' );
    // add_theme_support( 'responsive-embeds' );
    // add_theme_support( 'editor-styles' );
    // add_editor_style( 'style-editor.css' );
}
add_action( 'after_setup_theme', 'pixelpoint_config', 0 );