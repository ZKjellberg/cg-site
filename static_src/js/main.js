var $ = require( 'jquery' );
var mermaid = require( 'mermaid' );
var jQuery = window.jQuery = $;
window.$ = $;
require('cloudgov-style');

mermaid.initialize({startOnLoad: false});

var anchorJS = require('anchor-js');
require('jquery.scrollto');

var hljs = require('highlight.js');

function hideSidenav() {
  $('#container').addClass('sidebar-close');
  $('#sidebar > ul').hide();
}

function showSidenav() {
  $('#container').removeClass('sidebar-close');
  $('#sidebar > ul').show();
}

function initializeJS() {
  // Sidebar dropdown menu
  var parentMenu = $('.sidenav-level-two .open').parents('ul .nested-menu');
  parentMenu.slideDown(200);
  var parentMenuArrow = parentMenu.siblings("a").find('.menu-arrow');
  parentMenuArrow.addClass('fa-angle-down');
  parentMenuArrow.removeClass('fa-angle-right');
  jQuery('#sidebar .sub-menu > a').click(function () {
      // Toggle current submenu
      var sub = jQuery(this).next();
      if (sub.is(":visible")) {
          jQuery('.menu-arrow', this).addClass('fa-angle-right');
          jQuery('.menu-arrow', this).removeClass('fa-angle-down');
          sub.slideUp(200);
          jQuery(sub).removeClass("open")
      } else {
          jQuery('.menu-arrow', this).addClass('fa-angle-down');
    jQuery('.menu-arrow', this).removeClass('fa-angle-right');
          sub.slideDown(200);
          jQuery(sub).addClass("open")
      }

      // Center menu on screen
      var o = (jQuery(this).offset());
      diff = 200 - o.top;
      if(diff>0)
          jQuery("#sidebar").scrollTo("-="+Math.abs(diff),500);
      else
          jQuery("#sidebar").scrollTo("+="+Math.abs(diff),500);
  });


  jQuery('.toggle-nav').click(function () {
      if (jQuery('#sidebar > ul').is(":visible") === true) {
          hideSidenav();
      } else {
          showSidenav();
      }
  });

  //bar chart
  if (jQuery(".custom-custom-bar-chart")) {
      jQuery(".bar").each(function () {
          var i = jQuery(this).find(".value").html();
          jQuery(this).find(".value").html("");
          jQuery(this).find(".value").animate({
              height: i
          }, 2000)
      })
  }

  jQuery('.nav_toggle').on('click', function() {
    $("#sidebar").toggleClass('active');
    $('#main-content').toggleClass('active');
  });

  // AnchorJS
  var anchors = new anchorJS();
  anchors.options.visible = 'touch';
  anchors.add('.content h2,.content h3,.content h4,.content h5');

  // Highlight JS
  hljs.initHighlightingOnLoad();
}

(function(){
		var caches = {};
		$.fn.showGithub = function(user, repo, type, count){
			$(this).each(function(){
				var $e = $(this);
				var user = $e.data('user') || user,
				repo = $e.data('repo') || repo,
				type = $e.data('type') || type || 'watch',
				count = $e.data('count') == 'true' || count || true;
				var $mainButton = $e.html('<span class="github-btn"><a class="btn btn-xs btn-default" href="#" target="_blank"><i class="icon-github"></i> <span class="gh-text"></span></a><a class="gh-count"href="#" target="_blank"></a></span>').find('.github-btn'),
				$button = $mainButton.find('.btn'),
				$text = $mainButton.find('.gh-text'),
				$counter = $mainButton.find('.gh-count');

				function addCommas(a) {
					return String(a).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
				}

				function callback(a) {
					if (type == 'watch') {
						$counter.html(addCommas(a.watchers));
					} else {
						if (type == 'fork') {
							$counter.html(addCommas(a.forks));
						} else {
							if (type == 'follow') {
								$counter.html(addCommas(a.followers));
							}
						}
					}

					if (count) {
						$counter.css('display', 'inline-block');
					}
				}

				function jsonp(url) {
					var ctx = caches[url] || {};
					caches[url] = ctx;
					if(ctx.onload || ctx.data){
						if(ctx.data){
							callback(ctx.data);
						} else {
							setTimeout(jsonp, 500, url);
						}
					}else{
						ctx.onload = true;
						$.getJSON(url, function(a){
							ctx.onload = false;
							ctx.data = a;
							callback(a);
						});
					}
				}

				var urlBase = 'https://github.com/' + user + '/' + repo;

				$button.attr('href', urlBase + '/');

				if (type == 'watch') {
					$mainButton.addClass('github-watchers');
					$text.html('Star');
					$counter.attr('href', urlBase + '/stargazers');
				} else {
					if (type == 'fork') {
						$mainButton.addClass('github-forks');
						$text.html('Fork');
						$counter.attr('href', urlBase + '/network');
					} else {
						if (type == 'follow') {
							$mainButton.addClass('github-me');
							$text.html('Follow @' + user);
							$button.attr('href', 'https://github.com/' + user);
							$counter.attr('href', 'https://github.com/' + user + '/followers');
						}
					}
				}

				if (type == 'follow') {
					jsonp('https://api.github.com/users/' + user);
				} else {
					jsonp('https://api.github.com/repos/' + user + '/' + repo);
				}

			});
		};

	})();


(function($){
	(function(){
		var caches = {};
		$.fn.showGithub = function(user, repo, type, count){

			$(this).each(function(){
				var $e = $(this);

				var user = $e.data('user') || user,
				repo = $e.data('repo') || repo,
				type = $e.data('type') || type || 'watch',
				count = $e.data('count') == 'true' || count || true;

				var $mainButton = $e.html('<span class="github-btn"><a class="btn btn-xs btn-default" href="#" target="_blank"><i class="icon-github"></i> <span class="gh-text"></span></a><a class="gh-count"href="#" target="_blank"></a></span>').find('.github-btn'),
				$button = $mainButton.find('.btn'),
				$text = $mainButton.find('.gh-text'),
				$counter = $mainButton.find('.gh-count');

				function addCommas(a) {
					return String(a).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
				}

				function callback(a) {
					if (type == 'watch') {
						$counter.html(addCommas(a.watchers));
					} else {
						if (type == 'fork') {
							$counter.html(addCommas(a.forks));
						} else {
							if (type == 'follow') {
								$counter.html(addCommas(a.followers));
							}
						}
					}

					if (count) {
						$counter.css('display', 'inline-block');
					}
				}

				function jsonp(url) {
					var ctx = caches[url] || {};
					caches[url] = ctx;
					if(ctx.onload || ctx.data){
						if(ctx.data){
							callback(ctx.data);
						} else {
							setTimeout(jsonp, 500, url);
						}
					}else{
						ctx.onload = true;
						$.getJSON(url, function(a){
							ctx.onload = false;
							ctx.data = a;
							callback(a);
						});
					}
				}

				var urlBase = 'https://github.com/' + user + '/' + repo;

				$button.attr('href', urlBase + '/');

				if (type == 'watch') {
					$mainButton.addClass('github-watchers');
					$text.html('Star');
					$counter.attr('href', urlBase + '/stargazers');
				} else {
					if (type == 'fork') {
						$mainButton.addClass('github-forks');
						$text.html('Fork');
						$counter.attr('href', urlBase + '/network');
					} else {
						if (type == 'follow') {
							$mainButton.addClass('github-me');
							$text.html('@' + user);
							$button.attr('href', 'https://github.com/' + user);
							$counter.attr('href', 'https://github.com/' + user + '/followers');
						}
					}
				}

				if (type == 'follow') {
					jsonp('https://api.github.com/users/' + user);
				} else {
					jsonp('https://api.github.com/repos/' + user + '/' + repo);
				}

			});
		};

	})();
})(jQuery);

// Right now this only supports a single Mermaid diagram on the page.
var renderDiagrams = function() {
  // Are there any diagrams here?
  if ( 1 > $( '.js-diagrams' ).length ) {
    return undefined;
  }

  var diagrams = $( '.js-diagrams' );
  var padding = 30;

  diagrams.each( function ( idx, el ) {
    var $el = $( el );
    var diagramText = $( el ).find( '.js-diagrams__raw' ).text()
    mermaid.render(
      $el.find( '.js-diagrams__stage' ).attr( 'id' ),
      diagramText,
      function callbackMermaidRender( c ) {
        $el.find( '.js-diagrams__stage' ).html( c );
      }
    );
    $el.find( '.js-diagrams__stage' ).find( 'style' ).remove();
    var updatedHeight = Math.ceil( $el.find( '.js-diagrams__stage svg .output' )[0].getBBox().height ) + padding
    var updatedWidth = Math.ceil( $el.find( '.js-diagrams__stage svg .output' )[0].getBBox().width ) + padding
    $el.find( '.js-diagrams__stage svg' ).height( updatedHeight );
    $el.find( '.js-diagrams__stage' ).width( updatedWidth );
  } );

}

jQuery(document).ready(function(){
    initializeJS();
    $('[rel=show-github]').showGithub();
    renderDiagrams();
});
