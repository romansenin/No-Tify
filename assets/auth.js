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
    console.log(cred);

    document.getElementsByClassName('form-signup')[0].reset();

    window.location = 'notify.html'; //After successful login, user will be redirected to home.html
  });

});