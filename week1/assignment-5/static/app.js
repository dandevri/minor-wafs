(function() {

//Object Literal
  var app = {
    init: function() {
      routes.init();
      sections.init();
    }
  };

  // Elk object heeft eigen onderdeel ter verantwoordelijkheid.
  var routes = {
    init: function() {
      window.addEventListener('hashchange', function() {
          sections.toggle(window.location.hash);
      });
    }
  };

  var sections = {
    init: function() {
      this.toggle('#home');
    },
    toggle: function(elementSelector) {

      // Alles op hidden
      var sectionElements = document.querySelectorAll('section');
      for(var i = 0; i < sectionElements.length; i++) {
        sectionElements[i].classList.add('hidden');
      }
      // Eentje van hidden af
      document.querySelector(elementSelector).classList.remove('hidden');
    }
  };

  app.init();

})();
