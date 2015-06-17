var setGameHeight = function() {
  var cw = $(".game-square").width();
  $(".game-square").css({'height': cw+"px"});
};

$(document).ready(function() {
  setGameHeight();
  $(window).resize(function() {
    setGameHeight();
  });
});
