<!DOCTYPE html>
<html class="load-full-screen">
<head>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="LimpidThemes">

    <title>Cheapliner - Get the best price</title>

    <!-- STYLES -->
    <link href="assets/css/animate.min.css" rel="stylesheet">
    <link href="assets/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="assets/css/owl.carousel.css" rel="stylesheet">
    <link href="assets/css/owl-carousel-theme.css" rel="stylesheet">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="assets/css/flexslider.css" rel="stylesheet" media="screen">
    <link href="assets/css/style.css" rel="stylesheet" media="screen">

    <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <!-- FONTS -->

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,800,700,600' rel='stylesheet' type='text/css'>

</head>
<body class="load-full-screen">

<!-- BEGIN: PRELOADER -->
<div id="loader" class="load-full-screen">
    <div class="loading-animation">
        <span><i class="fa fa-plane"></i></span>
        <span><i class="fa fa-bed"></i></span>
        <span><i class="fa fa-ship"></i></span>
        <span><i class="fa fa-suitcase"></i></span>
    </div>
</div>
<!-- END: PRELOADER -->

<!-- END: COLOR SWITCHER -->

<!-- BEGIN: SITE-WRAPPER -->
<div id="example"></div>
<!-- END: SITE-WRAPPER -->

<!-- Load Scripts -->
<script src="/js/app.js"></script>
<script src="assets/js/respond.js"></script>
<script src="assets/js/jquery.js"></script>
<script src="assets/plugins/owl.carousel.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/jquery-ui.min.js"></script>
<script src="assets/js/bootstrap-select.min.js"></script>
<script src="assets/plugins/wow.min.js"></script>

<script src="assets/js/js.js"></script>
<script type="text/javascript">
    /* SLIDER SETTINGS */
    jQuery(function($){
        "use strict";
        $.supersized({

            //Functionality
            slideshow               :   1,		//Slideshow on/off
            autoplay				:	1,		//Slideshow starts playing automatically
            start_slide             :   1,		//Start slide (0 is random)
            random					: 	0,		//Randomize slide order (Ignores start slide)
            slide_interval          :   10000,	//Length between transitions
            transition              :   1, 		//0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
            transition_speed		:	500,	//Speed of transition
            new_window				:	1,		//Image links open in new window/tab
            pause_hover             :   0,		//Pause slideshow on hover
            keyboard_nav            :   0,		//Keyboard navigation on/off
            performance				:	1,		//0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
            image_protect			:	1,		//Disables image dragging and right click with Javascript

            //Size & Position
            min_width		        :   0,		//Min width allowed (in pixels)
            min_height		        :   0,		//Min height allowed (in pixels)
            vertical_center         :   1,		//Vertically center background
            horizontal_center       :   1,		//Horizontally center background
            fit_portrait         	:   1,		//Portrait images will not exceed browser height
            fit_landscape			:   0,		//Landscape images will not exceed browser width

            //Components
            navigation              :   1,		//Slideshow controls on/off
            thumbnail_navigation    :   1,		//Thumbnail navigation
            slide_counter           :   1,		//Display slide numbers
            slide_captions          :   1,		//Slide caption (Pull from "title" in slides array)
            slides 					:  	[		//Slideshow Images
                {image : 'assets/images/slide.jpg', title : 'Slide 1'},
                {image : 'assets/images/slide2.jpg', title : 'Slide 2'},
                {image : 'assets/images/slide.jpg', title : 'Slide 3'},
            ]

        });
    });
    $(document).ready(function(){
        var cond = false;
        $(".cs-select").on("click", function() {

            if(!cond ){
                $(".dropdown-menu").css("display","block");


                cond =true;
            }
            else{
                $(".dropdown-menu").css("display","none");

                cond =false;
            }

        });
        $("#inlineRadio2").attr('checked', true);
        $(".radio-event-hanlder").click(function(){


            if($(this).val()==="Round Trip"){
                $("#return_date").parents('.search-col-padding').show();
                $(this).attr('checked', true);
            }
            else{
                $("#return_date").parents('.search-col-padding').hide();
                $(this).attr('checked', true);

            }


        })
    })
    $("#outbound-range").slider({
        range: true,
        min: 0,
        max: 1440,
        step: 15,
        values: [360, 1440],
        slide: function (e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if(hours1.toString().length == 1) hours1 = '0' + hours1;
            if(minutes1.toString().length == 1) minutes1 = '0' + minutes1;

            $('.outbound-slider-time').html(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if(hours2.toString().length == 1) hours2 = '0' + hours2;
            if(minutes2.toString().length == 1) minutes2 = '0' + minutes2;

            $('.outbound-slider-time2').html(hours2 + ':' + minutes2);
        }
    });


    $("#return-range").slider({
        range: true,
        min: 0,
        max: 1440,
        step: 15,
        values: [360, 1440],
        slide: function (e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if(hours1.toString().length == 1) hours1 = '0' + hours1;
            if(minutes1.toString().length == 1) minutes1 = '0' + minutes1;


            $('.return-slider-time').html(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if(hours2.toString().length == 1) hours2 = '0' + hours2;
            if(minutes2.toString().length == 1) minutes2 = '0' + minutes2;

            $('.return-slider-time2').html(hours2 + ':' + minutes2);
        }
    });

        $('.selectpicker').selectpicker({
            style: 'custom-select-button'
        });
        $("#outbound-range").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [360, 1440],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if(hours1.toString().length == 1) hours1 = '0' + hours1;
                if(minutes1.toString().length == 1) minutes1 = '0' + minutes1;

                $('.outbound-slider-time').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if(hours2.toString().length == 1) hours2 = '0' + hours2;
                if(minutes2.toString().length == 1) minutes2 = '0' + minutes2;

                $('.outbound-slider-time2').html(hours2 + ':' + minutes2);
            }
        });


        $("#return-range").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [360, 1440],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if(hours1.toString().length == 1) hours1 = '0' + hours1;
                if(minutes1.toString().length == 1) minutes1 = '0' + minutes1;


                $('.return-slider-time').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if(hours2.toString().length == 1) hours2 = '0' + hours2;
                if(minutes2.toString().length == 1) minutes2 = '0' + minutes2;

                $('.return-slider-time2').html(hours2 + ':' + minutes2);
            }
        });


</script>
</body>
</html>