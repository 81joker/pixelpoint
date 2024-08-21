<?php get_header(); ?>
<?php 
                                while( have_posts() ) : the_post();
                                get_template_part( 'parts/content', 'page' );

                                if( comments_open() || get_comments_number() ){
                                    comments_template();
                                }
                                endwhile;
                            ?> 
        <div id="content" class="site-content">
            <div id="primary" class="content-area">
             <h1>Halllo</h1>
            </div>
        </div>
<?php get_footer(); ?>