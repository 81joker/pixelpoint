<?php 


function pixelpoint_load_scripts(){

    //   Google Font 
    wp_enqueue_style( 'pixelpoint-google-fonts', 'https://fonts.googleapis.com/css?family=Work+Sans:400,500,600,700,800,900|Poppins:400,500,600,700&display=swap', array(), null );
    wp_enqueue_style('pixelpoint-googleapiss', 'https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');


    
    //  Css Styles
    wp_enqueue_style( 'pixelpoint-bootstrap-style',get_template_directory_uri() . '/assets/css/bootstrap.min.css' );
    wp_enqueue_style( 'pixelpoint-font-awesome-style',get_template_directory_uri() . '/assets/css/font-awesome.min.css' );
    wp_enqueue_style( 'pixelpoint-elegant-icons',get_template_directory_uri() . '/assets/css/elegant-icons.css' );

    wp_enqueue_style( 'pixelpoint-template-style',get_template_directory_uri() . '/assets/css/owl.carousel.min.css' );
    wp_enqueue_style( 'pixelpoint-template-style',get_template_directory_uri() . '/assets/css/magnific-popup.css' );
    wp_enqueue_style( 'pixelpoint-template-style',get_template_directory_uri() . '/assets/css/slicknav.min.css' );
    // wp_enqueue_style( 'pixelpoint-style-sass',get_template_directory_uri() . '/assets/sass/style.sass' );
    wp_enqueue_style( 'pixelpoint-style-css',get_template_directory_uri() . '/assets/css/style.css' );
    wp_enqueue_style( 'pixelpoint-style-css',get_template_directory_uri() . '/assets/css/api.css' );



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




function display_api_data() {
    // $url = 'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?token=9962098a5f6c6ae8d16ad5aba95afee0';
       $url = 'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0';

    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        echo 'Error: ' . $response->get_error_message();
        return;
    }

    $data = json_decode($response['body'], true);

    if (isset($data['@graph'])) {
        foreach ($data['@graph'] as $event) { 
            // echo "<pre>";
            // var_dump($event);
            // echo "</pre>";
            
            // Extract and format time
            $startDate = isset($event['startDate']) ? new DateTime($event['startDate']) : null;
            $endDate = isset($event['endDate']) ? new DateTime($event['endDate']) : null;

            $formatStartDate = $startDate ? $startDate->format('Y-m-d') : 'Unknown time';
            $formattedEndDate = $endDate ? $endDate->format('Y-m-d') : 'Unknown time';

            $formattedStartTime = $startDate ? $startDate->format('h:i a') : 'Unknown time';
            $formattedEndTime = $endDate ? $endDate->format('h:i a') : 'Unknown time';

            // Extract location
            $location = isset($event['location']) && is_array($event['location']) ? $event['location'] : [];
            $locationName = !empty($location) ? 'Location Data Available' : 'No location provided';
            $location_id = isset($event['location'][0]['@type'][1]) ? $event['location'][0]['@type'][1] : null;
            $location_id = ltrim($location_id, 'dcls:'); 
            $locationName = 'No location provided';
    
            ?>


            <div class="st-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="sc-pic">
                        <?php
                                if (isset($event['image']) && is_array($event['image'])) {
                                    foreach ($event['image'] as $image) {
                                        if (isset($image['contentUrl'])) {
                                            echo '<img src="' . esc_url($image['contentUrl']) . '" alt="' . esc_attr($event['name']) . '">';
                                            break; 
                                        }
                                    }
                                } else {
                                    echo '<img src="img/schedule/schedule-1.jpg" alt="Default Image">'; // Fallback image
                                }
                                ?>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="sc-text">
                            <h4><?php echo $event['name']; ?></h4>

                            <p><?php echo  wp_trim_words($event['description'], 10); ?><a  href="<?php the_permalink(); ?>" class="">Lessen weiter</a></p>
                            <!-- <ul>
                                <li><i class="fa fa-user"></i> John Smith</li>
                                <li><i class="fa fa-envelope"></i> john@Colorlib.com
                                </li>
                            </ul> -->
                            <a href="#" class="primary-btn">Hll link</a>
                        </div>
                    </div>
                    <div class="col-lg-2">

                        <ul class="sc-widget">
                            <li><i class="fa fa-map-marker"></i> </li>
                            <li  class="font-weight-bold">
                                <?php if($locationName): ?>
                                <?php echo $location_id; ?>
                                <?php else: ?>
                                    <?=  $locationName;?>
                                <?php endif; ?>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-2">
                        <ul class="sc-widget">
                            <li><i class="fa fa-clock-o"></i></li> 
                            <li class="font-weight-bold px-0" style="font-size: 14px;"> <?php echo  $formatStartDate; ?></li>
                            <li class="font-weight-bold px-0" style="font-size: 14px;"> <?php echo  $formattedStartTime; ?></li>
                            <li class="font-weight-bold px-0" style="font-size: 14px;">Bis</li>
                            <li class="font-weight-bold px-0" style="font-size: 14px;"> <?php echo $formattedEndDate ; ?></li>
                            <li class="font-weight-bold px-0" style="font-size: 14px;"> <?php echo  $formattedEndTime; ?></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
<?php    
};
    } else {
        echo 'No data available.';
    }
}


// function fetch_carinthia_api_data() {
//     $url = 'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?token=9962098a5f6c6ae8d16ad5aba95afee0';

//     // Make the request to the API
//     $response = wp_remote_get($url);

//     // Check if there was an error during the request
//     if (is_wp_error($response)) {
//         echo 'Error: ' . $response->get_error_message();
//         return null;
//     }

//     // Retrieve the body of the response
//     $body = wp_remote_retrieve_body($response);

//     // Decode the JSON data into a PHP array
//     return json_decode($body, true);
// }

// function display_carinthia_data() {
//     $data = fetch_carinthia_api_data();

//     // Check if the data is a valid array and contains '@graph'
//     if (!is_array($data) || empty($data['@graph'])) {
//         return 'No data available.';
//     }

//     // Start building the output HTML
//     $output = '<div class="carinthia-data">';

//     foreach ($data['@graph'] as $item) {
//         // Adjust the keys according to your actual API response
//         $output .= '<div class="item">';
//         $output .= '<h3>' . esc_html($item['name']) . '</h3>';
//         $output .= '<p>' . esc_html($item['description']) . '</p>';
//         $output .= '</div>';
//     }

//     $output .= '</div>';

//     return $output;
// }
// add_shortcode('carinthia_data', 'display_carinthia_data');

