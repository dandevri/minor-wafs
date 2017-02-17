
var app = {
  init: function() {
    routes.init();
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
      document.querySelector('.list').innerHTML += '<li>' + standing.position + standing.Driver.givenName + standing.Driver.familyName + '</li>';
    });
  },

  createDriversList: function(dataArray) {
    // Verberg de andere lijst
    document.querySelector('.list').innerHTML = " ";
    // Vul lijst met data
    dataArray.forEach(function(driver) {
      // document.querySelector('.list').innerHTML += '<li>' + driver.code + ' | ' + driver.givenName + ' ' +  driver.familyName +'</li>';
      document.querySelector('.list').innerHTML += `
        <li>
          <h2>${driver.code}</h2>
          <p>${driver.givenName} ${driver.familyName}</p>
        </li>
      `;
    });
  },
  createRaceSchedule: function(dataArray) {
    document.querySelector('.list').innerHTML = " ";
    dataArray.forEach(function(race) {
      document.querySelector('.list').innerHTML += '<li>' + race.raceName + '</li>';
    });
  }
};

app.init();
