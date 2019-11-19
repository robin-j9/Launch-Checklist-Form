let fieldsFilled = false;
let fieldsFilledWithCorrectValue = false;

window.addEventListener('load', function() {
   let form = document.getElementById('launchForm').getElementsByTagName('form')[0];
   let pilotName = document.getElementById('pilotName');
   let copilotName = document.getElementById('copilotName');
   let fuelLevel = document.getElementById('fuelLevel');
   let cargoMass = document.getElementById('cargoMass');

   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let faultyItems = document.getElementById('faultyItems');
   let launchStatus = document.getElementById('launchStatus');
   

   form.addEventListener('submit', function() {      
      checkAllFieldsFilled();
      checkFieldsFilledWithCorrectType();
      if (fieldsFilled && fieldsFilledWithCorrectValue) {
         updateShuttleRequirements();
         selectPlanet();
      }
   })

})

function checkAllFieldsFilled() {
   if (pilotName.value === '' || 
       copilotName.value === '' || 
       fuelLevel.value === '' || 
       cargoMass.value === '') {
      alert('Must enter a value in all fields.');
      event.preventDefault();
   } else {
      fieldsFilled = true;
   }
}

function checkFieldsFilledWithCorrectType() {
   if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
      alert('Must enter valid information for all fields');
      event.preventDefault();
   } else {
      fieldsFilledWithCorrectValue = true;
   }
}

function updateShuttleRequirements() {
   pilotStatus.textContent = `Pilot ${pilotName.value} is ready for launch`;
   copilotStatus.textContent = `Copilot ${copilotName.value} is ready for launch`;
   faultyItems.style.visibility = 'visible';

   if (fuelLevel.value < 10000 || cargoMass.value > 10000) {
      shuttleNotReady();
   } else {
      shuttleReady();
   }

   event.preventDefault();
}

function shuttleNotReady() {
   launchStatus.textContent = 'Shuttle not ready for launch';
   launchStatus.style.color = 'red';

   if (fuelLevel.value < 10000) {
      fuelStatus.textContent = 'Fuel level too low for launch';
   }

   if (cargoMass.value > 10000) {
      cargoStatus.textContent = 'Cargo mass too high for launch';
   }
}

function shuttleReady() {
   launchStatus.textContent = 'Shuttle is ready for launch'
   launchStatus.style.color = 'green';
   fuelStatus.textContent = 'Fuel level high enough for launch';
   cargoStatus.textContent = 'Cargo mass low enough for launch';
}

function selectPlanet() {
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
      response.json().then(function(json) {
         let index = Math.floor(Math.random() * 5);
         let missionTarget = document.getElementById('missionTarget');
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">
         `
      })
   })
}
