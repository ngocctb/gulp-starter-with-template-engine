;jQuery(function($) {
  var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      secSlider;

  var resizeMainWindow = function(e) {
      var windowWidthNew = jQuery(window).width();
      var windowHeightNew = jQuery(window).height();
      if (windowWidth != windowWidthNew || windowHeight != windowHeightNew) {
          windowWidth = windowWidthNew;
          windowHeight = windowHeightNew;
      }
  };
  $(window).bind('resize', resizeMainWindow);
  $(document).ready(function() {

  });
  $(window).load(function() {

  });

});
