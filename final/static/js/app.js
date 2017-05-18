import sections from '../js/modules/sections.js';
import routes from '../js/modules/routes.js';

var app = {

  init: function () {
    routes.init();
    document.querySelector('.overlay').addEventListener('click', sections.toggleOverlay); // Toggle overlay
  }
};

app.init();
