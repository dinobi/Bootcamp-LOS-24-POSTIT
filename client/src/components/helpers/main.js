import $ from 'jquery';

$(document).ready(() => {

  //submit on enter
  $('.message-box').keypress(function (e) {
    if(e.which === 13 && !e.shiftKey) {        
        $(this).closest('form').submit();
        e.preventDefault();
        return false;
    }
  });

  //Auto resize textarea to fit content
  $('.message-box')
    .on('change keydown paste cut', 'textarea', function () {
      $(this).height(0).height(this.scrollHeight);
    })
    .find('textarea')
    .change();
});
