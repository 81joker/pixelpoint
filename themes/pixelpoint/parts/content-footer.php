    <!-- Footer Section Begin -->
<!-- Footer Section Begin -->
<footer class="footer-section">
        <div class="container">
         
            <div class="row">
                <div class="col-lg-12">
                    <div class="footer-text">
                        <div class="ft-logo">
                            <a href="#" class="footer-logo"><img src="img/footer-logo.png" alt=""></a>
                        </div>
                        <ul>
                        <?php wp_nav_menu( array( 'theme_location' => 'pixelpoint_footer_menu' , 'depth' => 1 )); ?>

                        </ul>
                        <div class="copyright-text">
                        <p><?php echo esc_html( get_theme_mod( 'set_copyright', __( 'Copyright X - All Rights Reserved', 'pixelpoint' ) ) ); ?></p>
                        </div>
                        <div class="ft-social">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-linkedin"></i></a>
                            <a href="#"><i class="fa fa-instagram"></i></a>
                            <a href="#"><i class="fa fa-youtube-play"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer Section End -->
