// var request = new XMLHttpRequest();
//
// request.open('GET', 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC', true);
//
// request.addEventListener('load', function() {
//   var response = JSON.parse(request.responseText);
//
//   var plaatjes = response.data;
//
//   plaatjes.forEach(function(plaatje) {
//     document.querySelector('#content').innerHTML += '<img src="' + plaatje.images.downsized.url + '" />';
//   });
// });
//
// request.send();


var app = {
  init: function(){
    this.getTrendingImages();
  },
  getTrendingImages: function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC', true);
    request.addEventListener('load', function () {
      var response = JSON.parse(request.response);
      // console.log(sections.createTrending);
      sections.createTrending(response);
    });
    request.send();
  }
};

var routes = {
  init: function() {

  }
};

var sections = {
  createTrending: function(response) {
    response.data.forEach(function(plaatje) {
      document.querySelector('div').innerHTML += '<img src=" '+plaatje.images.downsized.url +'" />';
    });
  }
};

app.init();
