
var config = {
    apiKey: "AIzaSyDQrGtOU5HY-UGFMb7S3JzLs6hMBwnKA1o",
    authDomain: "train-schedule-da94c.firebaseapp.com",
    databaseURL: "https://train-schedule-da94c.firebaseio.com",
    projectId: "train-schedule-da94c",
    storageBucket: "train-schedule-da94c.appspot.com",
    messagingSenderId: "755805567713"
};

firebase.initializeApp(config);

var database = firebase.database();

  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        train: trainName,
        destination: destination,
        frequency: frequency
    };

    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(""),
      $("<td>").text(""),
    );


    $("#train-table > tbody").append(newRow);


    database.ref().push(newTrain);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
  
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var frequency = childSnapshot.val().start;

       
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(""),
      $("<td>").text(""),
    );
  
    $("#train-table > tbody").append(newRow);
  });