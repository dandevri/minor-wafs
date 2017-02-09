(function() {// Iffe

  'use strict'; // Use strict mode

//Object Literal
  var app = {
    init: function() {
      routes.init();
      sections.init(); // Run sections.init() once.
    }
  };

  // Every object has his own responsibility inside the app.
  var routes = {
    init: function() { // Init method
      window.addEventListener('hashchange', function() {
          sections.toggle(window.location.hash);
      });
    }
  };

  var sections = {
    init: function() { // Run toggle method once to hide home section.
      this.toggle('#home');
    },
    toggle: function(elementSelector) {

      // Loop trough sections, for everyone add class hidden.
      var sectionElements = document.querySelectorAll('section');
      for(var i = 0; i < sectionElements.length; i++) {
        sectionElements[i].classList.add('hidden');
      }
      // Remove class hidden
      document.querySelector(elementSelector).classList.remove('hidden');
    }
  };

  app.init();

})();
