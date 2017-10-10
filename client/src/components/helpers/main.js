import $ from 'jquery';

$(document).ready(() => {
  //Auto resize textarea to fit content
  $('.message-box')
    .on('change keydown paste cut', 'textarea', function () {
      $(this).height(0).height(this.scrollHeight);
    })
    .find('textarea')
    .change();
});
