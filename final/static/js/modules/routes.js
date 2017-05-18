import sections from '../modules/sections.js';
import request from '../modules/request.js';

var routes = {
  init: function () {
    routie({
      '': function () { // Show standing when first request is fired
        request.getDriverStandings();
      },
      standings: function () { // Same as above but not the browser doesn't reload
        request.getDriverStandings();
      },
      drivers: function () { // Drivers overview
        request.getRaceDrivers();
      },
      'driver/:id': function (id) { // Drivers detail
        sections.createDriverOverlay(id);
      },
      races: function () { // Race schedule
        request.getRaceSchedule();
      }
    });
  }
};

export default routes;
