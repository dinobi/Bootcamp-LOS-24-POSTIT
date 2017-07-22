
$(document).ready(() => {
  const mobileNav = 	$('#mobile-nav');
  // Responsive page header navigation
  mobileNav.html($('.nav-list').html());
	$('.nav-mobile').click(function navHandler() {
  if (mobileNav.hasClass('expanded')) {
    $('#mobile-nav.expanded').removeClass('expanded').slideUp(500);
    $(this).removeClass('open');
  } else {
    mobileNav.addClass('expanded').slideDown(500);
    $(this).addClass('open');
  }
});
  $('#search-button').click(() => {
    const div = $('div'), p = $('p');
    div.removeClass('hidden');
    p.removeClass('hidden');
  });
  $('.close-button').click(() => {
    const div = $('div'), p = $('p');
    div.addClass('hidden');
    p.addClass('hidden');
  }); // end of header nav

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

  // Wikipedia search Request
  $('.search button').on('click', () => {
    $('form').submit(() => { return false; });
    let searchTerm = $("#search-wiki").val();
    if (searchTerm == '' || searchTerm == undefined){
      searchTerm = 'https://en.wikipedia.org/wiki/Special:Random';
      window.open(searchTerm, '_blank');
    } else {
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?',
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: (data) => {
          let contentUI = '<div><h5>' + data[0] + '</h5><br>';
          if (data[2].length < 3){
            contentUI += '<p><em>' + data[1] + '</em><br>' + data[2] + '</p></div>';
            $('.search-result').html(contentUI);
          } else {
            for (let i = 1; i < 10; i++) {
              contentUI += '<p><em>' + data[1][i] + '</em><br>' + data[2][i] + '</p><br><br>'
            }
            contentUI += '</div>';
            $('.search-result').html(contentUI);
          }
        },
        error: () => {
          $('.search-result').html('An error was encountered');
        }
      });
    }
  }); // end of wiki search
});
