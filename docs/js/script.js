(function ($) {

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);

(function () {
  var url = location.href

  function urlcontains(s) {
    return url.toLowerCase().indexOf(s) > -1
  }

  if (urlcontains("file:///")) {
    return false
  }

  var local = urlcontains("//localhost:")

  if (!local) {
    if (!urlcontains("http://")) {
      url = url.replace("http://", "https://").replace("https://www.", "https://")
    }
  }

  if (location.href != url) {
    location.href = url
  }

  console.log("戈登走過去 欢迎你 =w= ")
  console.log("本站源码： https://github.com/gordonwalkedby/WalkedbyCOM")
})();
