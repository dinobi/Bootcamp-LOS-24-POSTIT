import $ from 'jquery';

$(document).ready(() => {
  const mobileNav = $('#mobile-nav');
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
  });// end of header nav

  // Wikipedia search Request
  $('.search-wiki button').on('click', () => {
    $('form').submit(() => false);
    let searchTerm = $('#search-wiki').val();
    if (searchTerm === '' || searchTerm === undefined) {
      searchTerm = 'https://en.wikipedia.org/wiki/Special:Random';
      window.open(searchTerm, '_blank');
    } else {
      $.ajax({
        url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=
        ${searchTerm}&format=json&callback=?`,
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: (data) => {
          let contentUI = `<div><h5>${data[0]}</h5><br>`;
          if (data[2].length < 3) {
            contentUI += `<p><em>${data[1]}</em><br>${data[2]}</p></div>`;
            $('.search-result').html(contentUI);
          } else {
            for (let i = 1; i < 10; i += 1) {
              contentUI += `<p><em>${data[1][i]}</em><br>
              ${data[2][i]}</p><br><br>`;
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
