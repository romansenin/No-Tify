$(document).ready(function() {
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

});
