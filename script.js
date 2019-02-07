//firebase link 
//https://console.firebase.google.com/u/1/project/train-scheduler-5e7e0/database/train-scheduler-5e7e0/data




  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBntwWsWr4bjLvHgru9FHsAxpl2TW40osM",
    authDomain: "train-scheduler-5e7e0.firebaseapp.com",
    databaseURL: "https://train-scheduler-5e7e0.firebaseio.com",
    projectId: "train-scheduler-5e7e0",
    storageBucket: "train-scheduler-5e7e0.appspot.com",
    messagingSenderId: "793489425273"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  //initial values
  var addTrain = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;

  //capture button click
  $("#submit-train").on("click", function(event) {
      event.preventDefault(); 

    //grabs user input 
    addTrain = $("#add-train").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = moment($("#first-train").val().trim(), "hh:mm").subtract(1, "years").format("x");
    frequency = $("#frequency").val().trim();

    //current time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    console.log(addTrain);


    //new train info
    var newTrain = {
      addTrain: addTrain,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency, 
    };

       //code for push to firebase
      dataRef.ref().push({
      });
  
      //clears elements
      $("#add-train").val("");
      $("destination").val("");
      $("#frequency").val("");

      //why is return false needed?
      return false;
  
  //end of onclick function 
  });


  //firebase watcher + initial loader 
  dataRef.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().addTrain);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().frequency);


  //calculate difference between trains ****
  var difference = moment().diff(moment(firstTrain), "minutes");

  //time apart(remainder)
  var trainRemain = difference % frequency;

  //minutes until arrival
  var minUntil = frequency - trainRemain;

  //next train arrival
  var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
  
  //adding new train to table
  $("#trainTable").append("<tr><td>" + addTrain + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "/td></tr>");


  });