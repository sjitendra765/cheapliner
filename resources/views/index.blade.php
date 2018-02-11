<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Cheapliner.com | Cheap your way</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Cheapliner, get the cheapest flight" />
  <meta name="keywords" content="flight, cheap, cheap flight, compare, travel, vacancy, holiday" />
  <meta name="author" content="Cheapliner" />


    <!-- Facebook and Twitter integration -->
  <meta property="og:title" content=""/>
  <meta property="og:image" content=""/>
  <meta property="og:url" content=""/>
  <meta property="og:site_name" content=""/>
  <meta property="og:description" content=""/>
  <meta name="twitter:title" content="" />
  <meta name="twitter:image" content="" />
  <meta name="twitter:url" content="" />
  <meta name="twitter:card" content="" />

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
  <link rel="shortcut icon" href="favicon.ico">

  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,300' rel='stylesheet' type='text/css'>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet' type='text/css'>


  <!-- Animate.css -->
  <link rel="stylesheet" href="css/animate.css">
  <!-- Icomoon Icon Fonts-->
  <link rel="stylesheet" href="css/icomoon.css">
  <!-- Bootstrap  -->
  <link rel="stylesheet" href="css/bootstrap.css">
  <!-- Superfish -->
  <link rel="stylesheet" href="css/superfish.css">
  <!-- Magnific Popup -->
  <link rel="stylesheet" href="css/magnific-popup.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="css/bootstrap-datepicker.min.css">
  <!-- CS Select -->
  <link rel="stylesheet" href="css/cs-select.css">
  
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/style1.css">
  <link rel="stylesheet" type="text/css" href="css/rc-slider.css">

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


  <!-- Modernizr JS -->
  <script src="/js/modernizr-2.6.2.min.js"></script>
  <!-- FOR IE9 below -->
  <!--[if lt IE 9]>
  <script src="js/respond.min.js"></script>
  <![endif]-->
  

  </head>
<div id="example"></div>
<script src="/js/app.js"></script>

  <script src="/js/jquery.min.js"></script>
  <!-- jQuery Easing -->
  <script src="/js/jquery.easing.1.3.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );
  </script>
  <!-- Bootstrap -->
  <script src="/js/bootstrap.min.js"></script>
  <!-- Waypoints -->
  <script src="/js/jquery.waypoints.min.js"></script>
  <script src="/js/sticky.js"></script>

  <!-- Stellar -->
  <script src="/js/jquery.stellar.min.js"></script>
  <!-- Superfish -->
  <script src="/js/hoverIntent.js"></script>
  <script src="/js/superfish.js"></script>
  <!-- Magnific Popup -->
  <script src="/js/jquery.magnific-popup.min.js"></script>
  <script src="/js/magnific-popup-options.js"></script>
  <!-- Date Picker -->
  <script src="/js/bootstrap-datepicker.min.js"></script>
  <!-- CS Select -->
  <script src="/js/classie.js"></script>
  <script src="/js/selectFx.js"></script>
  
  <!-- Main JS -->
  <script src="/js/main.js"></script>

</body>
</html>

