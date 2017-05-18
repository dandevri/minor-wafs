import store from '../modules/store.js';

var sections = {

  createStandingsList: function (sort) {
    var dataArray = store.standingsArray;
    // Filter data only to top 10 drivers
    var topStandingsArray = dataArray.filter(function (driver) {
      // Convert string to number
      return Number(driver.positionText) <= 10;
    });
    // MDN example;
    if (sort === 'alfabetic') { // Sort alfabetic
      dataArray = topStandingsArray.sort(function (a, b) {
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
      dataArray = dataArray.sort(function (a, b) {
        return Number(a.position) - Number(b.position);
      });
    }

    sections.removeList();
    document.querySelector('.sort').innerHTML += `
      <button type="button" class="normal"> &darr; Position</li>
      <button type="button" class="alfabetic"> &#65; Alfabetic</li>`;
      // Only show these list items if race schedule is active

    document.querySelector('.normal').addEventListener('click', function () {
      // When normal click, normal list
      sections.createStandingsList();
    });
    document.querySelector('.alfabetic').addEventListener('click', function () {
      // When alfabetic click, normal list
      sections.createStandingsList('alfabetic');
    });

    // Total points this season using array.prototype methods
    var totalPoints =
    topStandingsArray.map(function (driver) {
      return Number(driver.points);
    }).filter(function (points) {
      return points > 0;
    }).reduce(function (total, points) {
      return total + points;
    });

    document.querySelector('.total').innerHTML =
    `Total points this season: ` + totalPoints;

    topStandingsArray.forEach(function (standing) { // Generate list items
      document.querySelector('.list').innerHTML += `
      <li>
        <h2>${standing.position}.</h2>
        <p> | </p>
        <h3>${standing.points}</h3>
        <p>${standing.Driver.givenName} ${standing.Driver.familyName}</p>
        <p class="constructor">${standing.Constructors[0].constructorId.replace(/_/g, ' ')}</p>
      </li>`;
    });
  },

  createDriversList: function (dataArray) {
    store.driversArray = dataArray; // Save for later use
    // Hide other list
    sections.removeList();
    // Fill list with data
    dataArray.forEach(function (driver, index) {
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

  createDriverOverlay: function (id) { // Create the overlay
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

  createRaceSchedule: function (dataArray) {
    // Hide the other lists
    sections.removeList();
    dataArray.forEach(function (race) {
      document.querySelector('.list').innerHTML += `
      <li>
        <h2>${race.raceName}</h2>
        <p class=date>${race.date}</p>
      </li>`;
    });
  },

  toggleOverlay: function () { // Hide the overlay
    var overlay = document.querySelector('.overlay');
    overlay.hidden = !overlay.hidden;
  },

  toggleSpinner: function () { // Toggle the spinner
    var spinner = document.querySelector('.preloader');
    spinner.classList.toggle('preloader-hidden');
  },

  removeList: function () { // Remove the list items
    document.querySelector('.sort').innerHTML = '';
    document.querySelector('.list').innerHTML = '';
    document.querySelector('.total').innerHTML = '';
  }
};

export default sections;
