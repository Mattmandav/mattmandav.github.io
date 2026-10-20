/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $vlinks_persist_tail = $vlinks.children("*.persist.tail");
var $hlinks = $('#site-nav .hidden-links');

// All-or-nothing behaviour: if the menu items (everything except .persist,
// i.e. the site name) do not all fit on one line, every one of them moves
// into the dropdown together, rather than overflowing one at a time.
var collapsed = false;
var fullWidth = 0;  // width of the visible list when every item was shown

function updateNav() {

  if (!collapsed) {
    // Everything is visible: collapse all items if the list overflows
    if ($vlinks.width() > $nav.width()) {
      fullWidth = $vlinks.width();
      $vlinks.children("*:not(.persist)").appendTo($hlinks);
      $btn.removeClass("hidden");
      collapsed = true;
    } else {
      // Everything fits: the dropdown button is not needed
      $btn.addClass("hidden");
    }
  } else if ($nav.width() > fullWidth) {
    // Collapsed, and there is now room for every item again: restore them all
    if ($vlinks_persist_tail.length > 0) {
      $hlinks.children().insertBefore($vlinks_persist_tail.first());
    } else {
      $hlinks.children().appendTo($vlinks);
    }
    $btn.addClass("hidden").removeClass("close");
    $hlinks.addClass("hidden");
    collapsed = false;
  }

  // Keep counter updated
  $btn.attr("count", collapsed ? $hlinks.children().length : 0);

  // update masthead height and the body/sidebar top padding
  var mastheadHeight = $('.masthead').height();
  $('body').css('padding-top', mastheadHeight + 'px');
  if ($(".author__urls-wrapper button").is(":visible")) {
    $(".sidebar").css("padding-top", "");
  } else {
    $(".sidebar").css("padding-top", mastheadHeight + "px");
  }

}

// Window listeners

$(window).on('resize', function () {
  updateNav();
});
screen.orientation.addEventListener("change", function () {
  updateNav();
});

$btn.on('click', function () {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

updateNav();