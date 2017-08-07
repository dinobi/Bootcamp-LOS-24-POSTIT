import $ from 'jquery'

const smoothScroll = () => {
    // Add smooth scroll to in-page anchor references
    $('a').on('click', function smoothScroll(event) {
      $('.active').removeClass('active');
      $(this).addClass('active');
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== '') {
      // Prevent default anchor click behavior
        event.preventDefault();
      // Store hash
        const hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // 800 milliseconds to takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, () => {
      // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    }); // End of smooth scroll
}

export default smoothScroll;