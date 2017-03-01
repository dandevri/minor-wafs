(function() {// Iffe

  var app = {
    driversArray: [],
    standingsArray: [],

    init: function() {
      routes.init();
      document.querySelector('.overlay').addEventListener('click', sections.toggleOverlay);
    }
  };

  var request = {
    getDriverStandings: function() {
      this.doRequest(
        'http://ergast.com/api/f1/2016/driverStandings.json',
        function(response) {
          app.standingsArray = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          sections.createStandingsList();
        }
      );
    },

    getRaceDrivers: function() {
      this.doRequest(
        'http://ergast.com/api/f1/2016/drivers.json', // url
        function(response) { // callbackFunction
          sections.createDriversList(response.MRData.DriverTable.Drivers);
        }
      );
    },

    getRaceSchedule: function() {
      this.doRequest(
        'http://ergast.com/api/f1/2017.json',
        function(response) {
          sections.createRaceSchedule(response.MRData.RaceTable.Races);
        }
      );
    },


    doRequest: function(url, callbackFunction) {
      sections.toggleSpinner();
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.addEventListener('load', function() {
        var response = JSON.parse(request.response);

        callbackFunction(response);
        sections.toggleSpinner();
      });
      request.send();
    }
  };

  var routes = {
    init: function() {
      routie({
        '': function() {
          request.getDriverStandings();
        },
        'standings': function() {
          request.getDriverStandings();
        },
        'drivers': function() {
          request.getRaceDrivers();
        },
        'driver/:id': function(id) {
          sections.createDriverOverlay(id);
        },
        'races': function() {
          request.getRaceSchedule();
        }
    });
    }
  };

  var sections = {

    createStandingsList: function(sort) {
      var dataArray = app.standingsArray;

      if(sort === 'alfabetic') {
        dataArray = dataArray.sort(function(a, b) {
          var nameA = a.Driver.givenName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.Driver.givenName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
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
        <li class="alfabetic">Alfabetic</li>`;

      document.querySelector('.normal').addEventListener('click', function() {
        sections.createStandingsList();
      });
      document.querySelector('.alfabetic').addEventListener('click', function() {
        sections.createStandingsList('alfabetic');
      });

      dataArray.forEach(function(standing) {
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
        // document.querySelector('.list').innerHTML += '<li>' + driver.code + ' | ' + driver.givenName + ' ' +  driver.familyName +'</li>';
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

    createDriverOverlay: function(id) {
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

      this.toggleOverlay();
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

    toggleSort: function() {
      var sort = document.querySelector('.list');
      app.standingsArray.sort;
    },

    toggleOverlay: function() {
      var overlay = document.querySelector('.overlay');
      overlay.hidden = !overlay.hidden;
    },

    toggleSpinner: function() {
      var spinner = document.querySelector('.preloader');
      spinner.classList.toggle('preloader-hidden');
    }
  };

app.init();

})();
