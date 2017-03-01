(function() {// Iffe

  var app = {
    driversArray: [], // Store driver data
    standingsArray: [], // Store standing data

    init: function() {
      routes.init();
      document.querySelector('.overlay').addEventListener('click', sections.toggleOverlay); // Toggle overlay
    }
  };

  var request = {
    getDriverStandings: function() {  // Request driver standing .json
      this.doRequest(
        'http://ergast.com/api/f1/2016/driverStandings.json',
        function(response) {
          app.standingsArray = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          sections.createStandingsList();
        }
      );
    },

    getRaceDrivers: function() { // Request race drivers .json
      this.doRequest(
        'http://ergast.com/api/f1/2016/drivers.json', // url
        function(response) { // callbackFunction
          sections.createDriversList(response.MRData.DriverTable.Drivers);
        }
      );
    },

    getRaceSchedule: function() { // Request the race schedule for the upcoming season .json
      this.doRequest(
        'http://ergast.com/api/f1/2017.json',
        function(response) {
          sections.createRaceSchedule(response.MRData.RaceTable.Races);
        }
      );
    },


    doRequest: function(url, callbackFunction) { // XLMHttpRequest with different .json url as parameter
      sections.toggleSpinner();
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.addEventListener('load', function() {
        var response = JSON.parse(request.response);

        callbackFunction(response);
        sections.toggleSpinner(); // Toggle the spinner everytime you do the request
      });
      request.send();
    }
  };

  var routes = {
    init: function() {
      routie({
        '': function() { // Show standing when first request is fired
          request.getDriverStandings();
        },
        'standings': function() { // Same as above but not the browser doesn't reload
          request.getDriverStandings();
        },
        'drivers': function() { // Drivers overview
          request.getRaceDrivers();
        },
        'driver/:id': function(id) { // Drivers detail
          sections.createDriverOverlay(id);
        },
        'races': function() { // Race schedule
          request.getRaceSchedule();
        }
    });
    }
  };

  var sections = {

    createStandingsList: function(sort) {
      var dataArray = app.standingsArray;

      // MDN example;
      if(sort === 'alfabetic') { // Sort alfabetic
        dataArray = dataArray.sort(function(a, b) {
          var nameA = a.Driver.givenName.toUpperCase(); // Sorting based on the given name
          var nameB = b.Driver.givenName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // If names are equal
          return 0;
        });

      } else {
        dataArray = dataArray.sort(function(a, b) {
          return Number(a.position) - Number(b.position);
        });
      }

      document.querySelector('.list').innerHTML = " ";
      document.querySelector('.sort').innerHTML = " ";
      document.querySelector('.sort').innerHTML += `
        <li class="normal">Normal</li>
        <li class="alfabetic">Alfabetic</li>`; // Only show these list items if race schedule is active

      document.querySelector('.normal').addEventListener('click', function() { // When normal click, normal list
        sections.createStandingsList();
      });
      document.querySelector('.alfabetic').addEventListener('click', function() { // When alfabetic click, normal list
        sections.createStandingsList('alfabetic');
      });

      dataArray.forEach(function(standing) { // Generate list items
        document.querySelector('.list').innerHTML += `
        <li>
          <h2>${standing.position}</h2>
          <h3>${standing.points}</h3>
          <p>${standing.Driver.givenName}</p>
          <p>${standing.Driver.familyName}</p>
          <p class="constructor">${standing.Constructors[0].constructorId}</p>
        </li>`;
      });
    },

    createDriversList: function(dataArray) {
      app.driversArray = dataArray; // save for later use
      // Hide other list
      document.querySelector('.list').innerHTML = " ";
      document.querySelector('.sort').innerHTML = " ";
      // Fill list with data
      dataArray.forEach(function(driver, index) {
        document.querySelector('.list').innerHTML += `
          <li>
            <a href="#driver/${index}">
              <h2>${driver.code}</h2>
              <p>${driver.givenName} ${driver.familyName}</p>
            </a>
          </li>
        `;
      });
    },

    createDriverOverlay: function(id) { // Create the overlay
      var driver = app.driversArray[id];
      document.querySelector('.overlay').innerHTML = `
      <div class="dialog">
        <p>First name: ${driver.givenName}</p>
        <p>Last name: ${driver.familyName}</p>
        <p>Nationality: ${driver.nationality}</p>
        <p>Date of Birth: ${driver.dateOfBirth}</p>
        <p>Wikipedia:</p>
        <a href="${driver.url}">${driver.code}</a>
      </div>
      `;

      this.toggleOverlay(); // Toggle the overlay
    },

    createRaceSchedule: function(dataArray) {
      document.querySelector('.list').innerHTML = " ";
      document.querySelector('.sort').innerHTML = " ";
      dataArray.forEach(function(race) {
        document.querySelector('.list').innerHTML += `
        <li>
          <h2>${race.raceName}</h2>
        </li>`;
      });
    },

    toggleOverlay: function() { // Hide the overlay
      var overlay = document.querySelector('.overlay');
      overlay.hidden = !overlay.hidden;
    },

    toggleSpinner: function() { // Toggle the spinner
      var spinner = document.querySelector('.preloader');
      spinner.classList.toggle('preloader-hidden');
    }
  };

app.init(); // Iniatilze the app

})();
