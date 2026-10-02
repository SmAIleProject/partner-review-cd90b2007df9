// scripts.js - Enhancements for TOC and table responsiveness

(function () {

  // Wrap tables in a responsive container and add captions if data-caption exists
  function enhanceTables() {
    var container = document.querySelector('.container');
    if (!container) return;
    var tables = container.querySelectorAll('table');
    tables.forEach(function (table) {
      if (table.closest('.table-responsive')) return; // already wrapped

      var wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';

      var parent = table.parentNode;
      parent.insertBefore(wrapper, table);
      wrapper.appendChild(table);

      var captionText = table.getAttribute('data-caption');
      if (captionText) {
        var cap = document.createElement('div');
        cap.className = 'table-caption';
        cap.textContent = captionText;
        wrapper.appendChild(cap);
      }
    });
  }

  if (document.readyState !== 'loading') {
    enhanceTables();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      enhanceTables();
    });
  }
})();
