import $ from 'jquery';

const mobileNav = () => {
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
  }

export default mobileNav;