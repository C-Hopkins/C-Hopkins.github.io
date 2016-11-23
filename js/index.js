$( document ).ready(function() {

// Cover Photo
// StackOverflow source of help: http://stackoverflow.com/questions/10797632/simulate-background-sizecover-on-video-or-img

  var min_w = 300; // minimum video width allowed
  var vid_w_orig;  // original video dimensions
  var vid_h_orig;

  jQuery(function() { // runs after DOM has loaded

      vid_w_orig = parseInt(jQuery('video').attr('width'));
      vid_h_orig = parseInt(jQuery('video').attr('height'));
      $('#debug').append("<p>DOM loaded</p>");

      jQuery(window).resize(function () { resizeToCover(); });
      jQuery(window).trigger('resize');
  });

  function resizeToCover() {

      // set the video viewport to the window size
      jQuery('#video-viewport').width(jQuery(window).width());
      jQuery('#video-viewport').height(jQuery(window).height());

      // use largest scale factor of horizontal/vertical
      var scale_h = jQuery(window).width() / vid_w_orig;
      var scale_v = jQuery(window).height() / vid_h_orig;
      var scale = scale_h > scale_v ? scale_h : scale_v;

      // don't allow scaled width < minimum video width
      if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

      // now scale the video
      jQuery('video').width(scale * vid_w_orig);
      jQuery('video').height(scale * vid_h_orig);
      // and center it by scrolling the video viewport
      jQuery('#video-viewport').scrollLeft((jQuery('video').width() - jQuery(window).width()) / 2);
      jQuery('#video-viewport').scrollTop((jQuery('video').height() - jQuery(window).height()) / 2);

      // debug output
      jQuery('#debug').html("<p>win_w: " + jQuery(window).width() + "</p>");
      jQuery('#debug').append("<p>win_h: " + jQuery(window).height() + "</p>");
      jQuery('#debug').append("<p>viewport_w: " + jQuery('#video-viewport').width() + "</p>");
      jQuery('#debug').append("<p>viewport_h: " + jQuery('#video-viewport').height() + "</p>");
      jQuery('#debug').append("<p>video_w: " + jQuery('video').width() + "</p>");
      jQuery('#debug').append("<p>video_h: " + jQuery('video').height() + "</p>");
      jQuery('#debug').append("<p>vid_w_orig: " + vid_w_orig + "</p>");
      jQuery('#debug').append("<p>vid_h_orig: " + vid_h_orig + "</p>");
      jQuery('#debug').append("<p>scale: " + scale + "</p>");
  };

  // hides video controls when hovering over coverr video
  // $('video').hover(function toggleControls() {
  //     if (this.hasAttribute("controls")) {
  //         this.removeAttribute("controls")
  //     } else {
  //         this.setAttribute("controls", "controls")
  //     }
  // })

  //set up counter for image swap
  var counter = 0;
  //event listener for image-swap click
  $('.image-swap').click(function(){
    //hides image clicked
    $(this).addClass('hide');
    //use the jQuery next method to show the sibling of the child (child = this, since it was just clicked)
    $(this).next().removeClass('hide');

    //add one to counter when event is clicked
    counter = counter + 1;
    // console.log(counter);
    //check when counter = 3, show results
    if (counter === 3) {
      $('.finale').show();

      $('html, body').animate({
        scrollTop: $(".finale").offset().top
      }, 1500);
    };
  });

  //listening for reset button with a click event
  $('.reset-button').click(function(){
    // hide finale
    $('.finale').hide();
    // clear counter
    counter = 0;
    // toggle hidden bird images
    $('.items img').toggleClass('hide');
    // scroll to top
    $('html, body').animate({ scrollTop: 0 }, '1500');
    // reset YouTube video to start at 0:00
    $('.youtube-video').attr('src', $('.youtube-video').attr('src'));
  });

}); //End Ready
