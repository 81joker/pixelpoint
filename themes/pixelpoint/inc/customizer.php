<?php

function pixelpoint_customizer( $wp_customize ){
    // 1 Copyright Section
    $wp_customize->add_section(
        'sec_copyright',
        array(
            'title' => __( 'Copyright Settings', 'pixelpoint' ),
            'description' => __( 'Copyright Settings', 'pixelpoint' )
        )
    );

            $wp_customize->add_setting(
                'set_copyright',
                array(
                    'type' => 'theme_mod',
                    'default' => __( 'Copyright X - All Rights Reserved', 'pixelpoint' ),
                    'sanitize_callback' => 'sanitize_text_field'
                )
            );

            $wp_customize->add_control(
                'set_copyright',
                array(
                    'label' => __( 'Copyright Information', 'pixelpoint' ),
                    'description' => __( 'Please, type your copyright here', 'pixelpoint' ),
                    'section' => 'sec_copyright',
                    'type' => 'text'
                )
            );
            
    // 2 Hero
    $wp_customize->add_section(
        'sec_hero',
        array(
            'title' => __( 'Hero Section', 'pixelpoint' )
        )
    );

            // Title
            $wp_customize->add_setting(
                'set_hero_title',
                array(
                    'type' => 'theme_mod',
                    'default' => __( 'Please, add some title', 'pixelpoint' ),
                    'sanitize_callback' => 'sanitize_text_field'
                )
            );

            $wp_customize->add_control(
                'set_hero_title',
                array(
                    'label' => __( 'Hero Title', 'pixelpoint' ),
                    'description' => __( 'Please, type your here title here', 'pixelpoint' ),
                    'section' => 'sec_hero',
                    'type' => 'text'
                )
            );  
            
            // Subtitle
            $wp_customize->add_setting(
                'set_hero_subtitle',
                array(
                    'type' => 'theme_mod',
                    'default' => __( 'Please, add some subtitle', 'pixelpoint' ),
                    'sanitize_callback' => 'sanitize_textarea_field'
                )
            );

            $wp_customize->add_control(
                'set_hero_subtitle',
                array(
                    'label' => __( 'Hero Subtitle', 'pixelpoint' ),
                    'description' => __( 'Please, type your subtitle here', 'pixelpoint' ),
                    'section' => 'sec_hero',
                    'type' => 'textarea'
                )
            );

            // Button Text
            $wp_customize->add_setting(
                'set_hero_button_text',
                array(
                    'type' => 'theme_mod',
                    'default' => __( 'Learn More', 'pixelpoint' ),
                    'sanitize_callback' => 'sanitize_text_field'
                )
            );

            $wp_customize->add_control(
                'set_hero_button_text',
                array(
                    'label' => __( 'Hero button text', 'pixelpoint' ),
                    'description' => __( 'Please, type your hero button text here', 'pixelpoint' ),
                    'section' => 'sec_hero',
                    'type' => 'text'
                )
            );

            // Button link
          $wp_customize->add_setting(
              'set_hero_button_link',
              array(
                  'type' => 'theme_mod',
                  'default' => '#',
                  'sanitize_callback' => 'esc_url_raw'
              )
          );

          $wp_customize->add_control(
              'set_hero_button_link',
              array(
                  'label' => __( 'Hero button link', 'pixelpoint' ),
                  'description' => __( 'Please, type your hero button link here', 'pixelpoint' ),
                  'section' => 'sec_hero',
                  'type' => 'url'
              )
          ); 
          
          // Hero Height
          $wp_customize->add_setting(
              'set_hero_height',
              array(
                  'type' => 'theme_mod',
                  'default' => 800,
                  'sanitize_callback' => 'absint'
              )
          );

          $wp_customize->add_control(
              'set_hero_height',
              array(
                  'label' => __( 'Hero height', 'pixelpoint' ),
                  'description' => __( 'Please, type your hero height', 'pixelpoint' ),
                  'section' => 'sec_hero',
                  'type' => 'number'
              )
          );

          // Hero Background
        $wp_customize->add_setting(
            'set_hero_background',
            array(
                'type' => 'theme_mod',
                'sanitize_callback' => 'absint'
            )
        );

        $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize,
            'set_hero_background',
            array(
                'label' => __( 'Hero Image', 'pixelpoint' ),
                'section'   => 'sec_hero',
                'mime_type' => 'image'
            )));

// 3. Blog
$wp_customize->add_section( 
    'sec_blog', 
    array(
        'title' => __( 'Blog Section', 'pixelpoint' )
) );

        // Posts per page
        $wp_customize->add_setting( 
            'set_per_page', 
            array(
                'type' => 'theme_mod',
                'sanitize_callback' => 'absint'
        ) );

        $wp_customize->add_control( 
            'set_per_page', 
            array(
                'label' => __( 'Posts per page', 'pixelpoint' ),
                'description' => __( 'How many items to display in the post list?', 'pixelpoint' ),			
                'section' => 'sec_blog',
                'type' => 'number'
        ) );

        // Post categories to include
        $wp_customize->add_setting( 
            'set_category_include', 
            array(
                'type' => 'theme_mod',
                'sanitize_callback' => 'sanitize_text_field'
        ) );

        $wp_customize->add_control( 
            'set_category_include', 
            array(
                'label' => __( 'Post categories to include', 'pixelpoint' ),
                'description' => __( 'Comma separated values or single category ID', 'pixelpoint' ),
                'section' => 'sec_blog',
                'type' => 'text'
        ) );	

        // Post categories to exclude
        $wp_customize->add_setting( 
            'set_category_exclude', 
            array(
                'type' => 'theme_mod',
                'sanitize_callback' => 'sanitize_text_field'
        ) );

        $wp_customize->add_control( 
            'set_category_exclude', 
            array(
                'label' => __( 'Post categories to exclude', 'pixelpoint' ),
                'description' => __( 'Comma separated values or single category ID', 'pixelpoint' ),			
                'section' => 'sec_blog',
                'type' => 'text'
        ) );            
}
add_action( 'customize_register', 'pixelpoint_customizer' );