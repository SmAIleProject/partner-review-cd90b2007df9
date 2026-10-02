/* Ordinary links work without JavaScript; this preserves reading position. */
(function () {
  'use strict';
  var key = 'smaile-language-position';
  document.querySelectorAll('.language-selector a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var target = new URL(link.href, window.location.href);
      target.hash = window.location.hash;
      target.search = window.location.search;
      link.href = target.href;
      try {
        var headings = Array.from(document.querySelectorAll('.container [id]'));
        var current = headings.filter(function (h) { return h.getBoundingClientRect().top <= 100; }).pop();
        sessionStorage.setItem(key, JSON.stringify({
          target: target.pathname,
          anchor: current ? current.id : null,
          offset: current ? current.getBoundingClientRect().top : 0,
          ratio: window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        }));
      } catch (_) { /* Storage is optional. */ }
    });
  });
  window.addEventListener('load', function () {
    try {
      var saved = JSON.parse(sessionStorage.getItem(key) || 'null');
      sessionStorage.removeItem(key);
      if (!saved || saved.target !== window.location.pathname || window.location.hash) return;
      var heading = saved.anchor && document.getElementById(saved.anchor);
      window.scrollTo(0, heading ? window.scrollY + heading.getBoundingClientRect().top - saved.offset :
        saved.ratio * Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
    } catch (_) { /* Links remain usable when storage is disabled. */ }
  });
})();
