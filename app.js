// PSUEDO CODE

// Schedule Display
// - Render the existing train data on page load

// Add Train
// + Guide user to enter Name, Destination, Train Time, & Frequency for a new train.
// + On submit, add the new data to a Firebase dB where data is stored.
// - Render all of the existing + new data (+ respective calculated data) to the display area
// - Clear the form so that new data can be added



// Set up a Firebase dB to hold the train data
var config = {
  apiKey: "AIzaSyBx_4nKMwYSOY4PIqGI1WpyDkTd-zD9VcQ",
  authDomain: "train-d3bc6.firebaseapp.com",
  databaseURL: "https://train-d3bc6.firebaseio.com",
  projectId: "train-d3bc6",
  storageBucket: "train-d3bc6.appspot.com",
  messagingSenderId: "645016073844"
};

firebase.initializeApp(config);

var database = firebase.database();
// Firebase setup complete


// GLOBAL VARIABLES
var name = "";
var destination = "";
var arrival = 0;
var freq = 0;





// FUNCTIONS





// PROCESSES

// Display current train data when user loads the page

// Firebase watcher + initial loader
database.ref().on("child_added", function(childSnapshot) {

// Log the saved data coming out of Firebase in snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().arrival);
  console.log(childSnapshot.val().freq);

// Add each train's data into the table
$("#full-train-list > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
childSnapshot.val().freq + "</td><td>" + childSnapshot.val().arrival + "</td><td>" + childSnapshot.val().freq + "</td></tr>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


// Capture new train data when user selects "Submit" button

$("#add-train").on("click", function(event) {
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#arrival-input").val().trim();
  freq = $("#freq-input").val().trim();

  // Push the captured data to the Firebase database
  database.ref().push({
    name: name,
    destination: destination,
    arrival: arrival,
    freq: freq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});
