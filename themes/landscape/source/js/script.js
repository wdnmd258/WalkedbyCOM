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

  if (location.host.indexOf("localhost:") < 0) {
    if (url.toLowerCase().indexOf("http://") >= 0) {
      location.href = url.replace("http://", "https://").replace("https://www.", "https://")
    }
  }

  url = location.href
  if (url.toLowerCase().indexOf("/page/") > 0) {
    document.getElementsByClassName('article-title')[0].click()
  }

  console.log("戈登走過去 欢迎你 =w= ")
  console.log("本站源码： https://github.com/gordonwalkedby/WalkedbyCOM")
})();


