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
// i.e. the site name) do not all fit on one line beside the name, every one
// of them moves into the dropdown together, rather than one at a time.
//
// Whether they fit is measured from scratch on every update, using an
// invisible copy of the full bar with wrapping turned off. Measuring the live
// bar is unreliable: the name is allowed to wrap onto two lines, so the bar
// squeezes instead of overflowing and the overflow is never detected.
var collapsed = false;

function fullMenuWidth() {
  var $items = collapsed ? $hlinks.children() : $vlinks.children("*:not(.persist)");
  var $probe = $('<ul class="visible-links" aria-hidden="true"></ul>').css({
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
    "white-space": "nowrap"
  });
  $probe.append($vlinks.children(".persist").clone(), $items.clone());
  $probe.find("*").css("white-space", "nowrap");
  $nav.append($probe);
  var width = $probe.outerWidth();
  $probe.remove();
  return width;
}

function updateNav() {

  var fits = fullMenuWidth() <= $nav.width();

  if (!collapsed && !fits) {
    // Move every item into the dropdown
    $vlinks.children("*:not(.persist)").appendTo($hlinks);
    collapsed = true;
  } else if (collapsed && fits) {
    // There is room for every item again: restore them all
    if ($vlinks_persist_tail.length > 0) {
      $hlinks.children().insertBefore($vlinks_persist_tail.first());
    } else {
      $hlinks.children().appendTo($vlinks);
    }
    $btn.removeClass("close");
    $hlinks.addClass("hidden");
    collapsed = false;
  }

  // The dropdown button is only shown while the items are collapsed
  $btn.toggleClass("hidden", !collapsed);

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