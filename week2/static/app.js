var app = {
  init: function() {
    routes.init();
  },
  
  raceDrivers: function() {
    this.doRequest('http://ergast.com/api/f1/2016/drivers.json');
  },

  /* 
  1. I would make a new request object with the functionality of doRequest in it. 
     This way it's cleaner when you do decide to do another ajax request from another part of your code.
  2. Don't forget to remove that console.log() ;)
  */
  doRequest: function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', function() {
      var response = JSON.parse(request.response);
      sections.createList(response.MRData.DriverTable.Drivers);
      console.log(response);
    });
    request.send();
  }
};

var routes = {
  init: function() {
    routie({
      'drivers': function() {
        app.raceDrivers();
      }
  });
  }
};

var sections = {
  createList: function(dataArray) {
    document.querySelector('#race-list').innerHTML = '';
    dataArray.forEach(function(driver) {
      document.querySelector('#race-list').innerHTML += '<li>' + driver.code + ' | ' + driver.givenName + ' ' +  driver.familyName +'</li>';
    });
  }
};

app.init();
