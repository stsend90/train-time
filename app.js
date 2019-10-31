let firebaseConfig = {
    apiKey: "AIzaSyBhm4NdY3bRsZWyJOVVQN-ZOnEN1foVwz4",
    authDomain: "class-act-bc9ce.firebaseapp.com",
    databaseURL: "https://class-act-bc9ce.firebaseio.com",
    projectId: "class-act-bc9ce",
    storageBucket: "class-act-bc9ce.appspot.com",
    messagingSenderId: "412549717679",
    appId: "1:412549717679:web:8e56d7079a8ce182c9be5a"
  };
 
  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();

$("#add-train-btn").on("click", function(e) {
  e.preventDefault();

  var trainName = $("#train-name-input").val().trim(),
      destination = $("#destination-input").val().trim(),
      startTrain = moment($("#start-train-input").val().trim(), "HH:mm").format("HH:mm");
      frequency = $("#frequency-rate-input").val().trim(),
      
      newTrain = {
        name: trainName,
        destination: destination, 
        firstTrain: startTrain,
        frequency: frequency
      };

  database.ref().push(newTrain);

  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.firstTrain);
  // console.log(newTrain.frequency);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-train-input").val("");
  $("#frequency-rate-input").val("");

});  

database.ref().on("child_added", function(childSnapShot) {
 // console.log(childSnapShot.val());

  var trainName = childSnapShot.val().name,
      destination = childSnapShot.val().destination,
      startTrain = childSnapShot.val().firstTrain,
      frequency = childSnapShot.val().frequency;

  var convertedTime = moment(startTrain, "HH:mm").subtract(1, "years"),
      diffTime = moment().diff(moment(convertedTime), "minutes"),
      timeRemain = diffTime % frequency,
      minAway = frequency - timeRemain,
      nextTrain = moment().add(minAway, "minutes").format("HH:mm");             
    //  console.log(convertedTime);
    //  console.log(diffTime);
    //  console.log(timeRemain);
    //  console.log(minAway);
      
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
  );

  $("#train-table > tbody").append(newRow);
});