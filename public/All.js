// hovering 
// https://stackoverflow.com/questions/3395293/how-to-check-if-the-cursor-is-over-an-element

$(document).on({
  mouseenter: function(evt) {
    $(evt.target).data('hovering', true);
  },
  mouseleave: function(evt) {
    $(evt.target).data('hovering', false);
  }
}, "*");

jQuery.expr[":"].hovering = function(elem) {
  return $(elem).data('hovering') ? true : false; 
};