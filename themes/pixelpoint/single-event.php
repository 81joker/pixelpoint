<?php

get_header();

while (have_posts()) {
  the_post(); ?>


  <section class="meetings-page" id="meetings">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="meeting-single-item">
                <div class="thumb">
                  <div class="date">
                    <h6>Nov <span>12</span></h6>
                  </div>


                  <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" class="single-event-img">
                  <?php if (has_post_thumbnail()) : ?>
                      <img src="<?php the_post_thumbnail_url(); ?>" alt="" height="420">
                      <?php else: ?>
                        <img src="<?php echo get_theme_file_uri('assets/images/default-img.jpg') ?>" alt="<?php the_title_attribute(); ?>">
                      <?php endif; ?>
                    </a>


                </div>
                <div class="down-content">
                  <a href="meeting-details.html">
                    <h4><?php echo the_title() ?></h4>
                  </a>
                  <!-- <a href="meeting-details.html"><h4>Online Teaching and Learning Tools</h4></a> -->
                  <p>Die Brücke des Friedens Längenfeldgasse 68\4\1, 1120 Wien</p>
                  <?php the_content(); ?>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="hours">
                        <h5>Hours</h5>
                        <p>Montag - Freitag: 07:00 AM - 13:00 PM<br>Samstag- Sontag: 09:00 AM - 15:00 PM</p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="location">
                        <h5>Location</h5>
                        <p>Name Addresse,
                          <br>XXX - 1150, Wien
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="down-event">
                        <h5>Date Event</h5>
                        <p>
                          <?php
                          if (get_field('event_date')) {
                            $eventDate =  get_field('event_date');
                            if ($eventDate) {
                              $date = new DateTime($eventDate);
                              echo $date->format('F j, Y');
                            }
                          }
                          ?>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="share">
                        <h5>Share:</h5>
                        <ul>
                          <li><a href="https://www.facebook.com/Diebrueckedesfriedens/?locale=de_DE">Facebook</a>,</li>
                          <li><a href="#">Twitter</a>,</li>
                          <li><a href="#">Linkedin</a>,</li>
                          <li><a href="#">Instgram</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 py-4">
              <div class="main-button-red">
                <a href="<?php echo get_post_type_archive_link('event') ?>">Back To Meetings List</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



<?php }

get_footer();

?>