$(document).ready(function() {

  // get data
  db.collection('tasks').get().then(function(snapshot) {
    console.log(snapshot.docs);
  });

  // listen for auth status changes
  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log("user logged in: ", user);
    } else {
      console.log("user logged out");
    }
  });


  // signup
  $(".form-signup").on("submit", function(event) {
    event.preventDefault();

    // get user info
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const email = $("#emailInput").val();
    const password = $("#passwordInput").val();

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(function(cred) {
      // document.getElementsByClassName('form-signup')[0].reset();
      window.location = "notify.html"; // After successful sign up, user will be redirected to notify.html
    });
  });

  // logout
  $("#logout").on("click", function(event) {
    event.preventDefault();
    auth.signOut().then(function() {
      window.location = "index.html"; // Go back to home page after sign out
    });
  });

  // login
  $(".form-signin").on("submit", function(event) {
    event.preventDefault();

    // get user info
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    auth.signInWithEmailAndPassword(email, password).then(function(cred) {
      window.location = "notify.html";
    });
  });
});
