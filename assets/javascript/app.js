
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

    var currentTime = moment();
    var convertTime = moment(currentTime).format("hh:mm");
    var differentTime = moment().diff(moment(convertTime), "minutes");
    var remainingTime = differentTime % frequency;
    var minutesAway = frequency - remainingTime;
    var nextTrain = moment().add(minutesAway, "minutes");
    var trainConverted = moment(nextTrain).format("hh:mm");
    var minutesConverted = moment(nextTrain).format("mm");

    var newTrain = {
        train: trainName,
        destination: destination,
        frequency: frequency,
        timeAway: minutesConverted,
        next: trainConverted
    };


    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(trainConverted),
      $("<td>").text(minutesConverted),
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
    var nextUp = childSnapshot.val().next;
    var mAway = childSnapshot.val().timeAway;

       
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextUp),
      $("<td>").text(mAway),
    );
  
    $("#train-table > tbody").append(newRow);
  });