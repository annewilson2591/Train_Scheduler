//firebase link 
//https://console.firebase.google.com/u/1/project/train-scheduler-5e7e0/database/train-scheduler-5e7e0/data


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBk777sSwDWry1XVuCqwHVALAPxtRonCJk",
    authDomain: "train-scheduler-66329.firebaseapp.com",
    databaseURL: "https://train-scheduler-66329.firebaseio.com",
    projectId: "train-scheduler-66329",
    storageBucket: "",
    messagingSenderId: "832858192271"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  //initial values
  var addTrain = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;

  //capture button click
  $("submit-train").on("click", function(event) {
      event.preventDefault(); 

    addTrain = $("add-train").val().trim();
    destination = $("destination").val().trim();
    firstTrain = $("first-train").val().trim();
    frequency = $("frequency").val().trim();

    //code for push
    dataRef.ref().push({

        addTrain: addTrain,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency, 
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  //firebase watcher + initial loader
  dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().addTrain);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
  
    // // full list of items to the well
    // $("#full-member-list").append("<div class='well'><span class='member-name'> " +
    //     childSnapshot.val().name +
    //     " </span><span class='member-email'> " + childSnapshot.val().email +
    //     " </span><span class='member-age'> " + childSnapshot.val().age +
    //     " </span><span class='member-comment'> " + childSnapshot.val().comment +
    //     " </span></div>");

    // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    //     // Change the HTML to reflect
    //     $("#name-display").text(snapshot.val().name);
    //     $("#email-display").text(snapshot.val().email);
    //     $("#age-display").text(snapshot.val().age);
    //     $("#comment-display").text(snapshot.val().comment);
    //});


