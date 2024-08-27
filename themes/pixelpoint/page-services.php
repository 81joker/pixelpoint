<?php get_header(); ?>



<div class="container">
    <h2>Input Search Form</h2>


    <!-- Start Event -->



    <div class="row">
        <div class="col-6">
            <!-- <div class="input-group date" data-provide="datepicker">
            <input type="text" class="form-control">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-th"></span>
            </div>
        </div> -->
            <!-- <input type="date" id="start-date" placeholder="Start Date">
         <input type="date" id="end-date" placeholder="End Date"> -->

            <!-- Start datepicker work-->
            <!-- <div class="input-group input-daterange" data-provide="datepicker">
        <input type="text" class="form-control" value="01-08-2024" id="start-date">
          <div class="input-group-addon">to<span class="glyphicon glyphicon-th"></span></div>
        <input type="text" class="form-control" value="01-08-2024" id="end-date">
    </div> -->
            <!-- Start datepicker work-->
            <!-- <div class="input-group input-daterange" data-provide="datepicker" data-date-format="dd-mm-yyyy" data-date-language="de-AT">
    <input type="text" class="form-control" value="27-08-2024" id="start-date">
    <div class="input-group-addon">to<span class="glyphicon glyphicon-th"></span></div>
    <input type="text" class="form-control" value="27-08-2024" id="end-date">
</div> -->

            <input type="text" min="1" max="31" id="dattag" name="dattag" class="form-control" style="width:60px;display:inline-block;" placeholder="DD" required />

            <div class="input-group input-daterange" data-provide="datepicker">
                <input type="text" class="form-control" min="2024-01-01" max="2025-12-31" value="2024-04-05" id="start-date">
                <div class="input-group-addon">to</div>
                <input type="text" class="form-control" value="2025-04-19" id="end-date">
            </div>
            <!-- end datepicker work-->



        </div>

        <div class="col-10 mt-3">
            <div class="input-group">
                <input href="<?php echo esc_url(site_url('/search')) ?>" type="search" id="form1" class="form-control" placeholder="Search" />
                <div class="input-group-append">
                    <a class="btn btn-primary input-search-trigger" type="button">               
                         <i class="fa fa-search px-3 text-white"></i>
                    </a>
                </div>
            </div>
        </div>

    </div>






    <!-- st Display the result  -->
    <div id="input-overlay__results" class="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1 pt-5"></div>
</div>
<!-- End Display the result -->


<link href="
https://cdn.jsdelivr.net/npm/bootstrap-datepicker@1.10.0/dist/css/bootstrap-datepicker3.min.css
" rel="stylesheet">

<script src="
https://cdn.jsdelivr.net/npm/bootstrap-datepicker@1.10.0/dist/js/bootstrap-datepicker.min.js
"></script>

<?php get_footer(); ?>