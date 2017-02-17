
var app = {
  driversArray: [],

  init: function() {
    routes.init();

    document.querySelector('.overlay').addEventListener('click', sections.toggleOverlay);
  },

  driverStandings: function() {
    this.doRequest(
      'http://ergast.com/api/f1/2016/driverStandings.json',
      function(response) {
        sections.createStandingsList(response.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      }
    );
  },

  raceDrivers: function() {
    this.doRequest(
      'http://ergast.com/api/f1/2016/drivers.json', // url
      function(response) { // callbackFunction
        sections.createDriversList(response.MRData.DriverTable.Drivers);
      }
    );
  },

  raceSchedule: function() {
    this.doRequest(
      'http://ergast.com/api/f1/2017.json',
      function(response) {
        sections.createRaceSchedule(response.MRData.RaceTable.Races);
      }
    );
  },


  doRequest: function(url, callbackFunction) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', function() {
      var response = JSON.parse(request.response);

      callbackFunction(response);

      console.log(response);
    });
    request.send();
  }
};

var routes = {
  init: function() {
    routie({
      ' ': function() {
        app.driverStandings();
      },
      'drivers': function() {
        app.raceDrivers();
      },
      'driver/:id': function(id) {
        sections.createDriverOverlay(id);
      },
      'races': function() {
        app.raceSchedule();
      }
  });
  }
};

var sections = {

  createStandingsList: function(dataArray) {
    document.querySelector('.list').innerHTML = " ";
    dataArray.forEach(function(standing) {
      document.querySelector('.list').innerHTML += `
      <li>
        <h2>${standing.position}</h2>
        <h3>${standing.points}</h3>
        <p>${standing.Driver.givenName}</p>
        <p>${standing.Driver.familyName}</p>
      </li>`;
    });
  },

  createDriversList: function(dataArray) {
    app.driversArray = dataArray; // save for later use
    // Hide other list
    document.querySelector('.list').innerHTML = " ";
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
    dataArray.forEach(function(race) {
      document.querySelector('.list').innerHTML += `
      <li>
        <h2>${race.raceName}</h2>
      </li>`;
    });
  },

  toggleOverlay: function() {
    var overlay = document.querySelector('.overlay');
    overlay.hidden = !overlay.hidden;
  }
};

app.init();
