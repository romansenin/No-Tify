$(document).ready(function() {
  // signup
  $(".form-signup").on("submit", function(event) {
    event.preventDefault();

    // get user info
    const firstName = $("#firstName").val();
    const email = $("#emailInput").val();
    const password = $("#passwordInput").val();
    const confirmPassword = $("#confirmPassword").val();

    if (password !== confirmPassword || password.length < 6) {
      const modalMessage = $("#modal-message");

      if (password !== confirmPassword) {
        modalMessage.text("Passwords don't match.");
      } else {
        modalMessage.text("Passwords must be at least six characters.");
      }

      // Get the modal
      var modal = document.getElementById("myModal");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // open the modal
      modal.style.display = "block";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).then(
        function(cred) {
          cred.user
            .updateProfile({
              displayName: `${firstName}`
            })
            .then(
              function() {
                window.location = "notify.html"; // After successful sign up, user will be redirected to notify.html
              },
              function(error) {
                console.error(error);
              }
            );
        },
        function(error) {
          const modalMessage = $("#modal-message");

          modalMessage.text(error.message);

          // Get the modal
          var modal = document.getElementById("myModal");

          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];

          // open the modal
          modal.style.display = "block";

          // When the user clicks on <span> (x), close the modal
          span.onclick = function() {
            modal.style.display = "none";
          };

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          };
        }
      );
    }
  });

  // login
  $(".form-signin").on("submit", function(event) {
    event.preventDefault();

    // get user info
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return auth.signInWithEmailAndPassword(email, password).then(
          function(cred) {
            window.location = "notify.html";
          },
          function(error) {
            const modalMessage = $("#modal-message");

            modalMessage.text(error.message);

            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // open the modal
            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
            };

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            };
          }
        );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    // auth.signInWithEmailAndPassword(email, password).then(
    //   function(cred) {
    //     window.location = "notify.html";
    //   },
    //   function(error) {
    //     const modalMessage = $("#modal-message");

    //     modalMessage.text(error.message);

    //     // Get the modal
    //     var modal = document.getElementById("myModal");

    //     // Get the <span> element that closes the modal
    //     var span = document.getElementsByClassName("close")[0];

    //     // open the modal
    //     modal.style.display = "block";

    //     // When the user clicks on <span> (x), close the modal
    //     span.onclick = function() {
    //       modal.style.display = "none";
    //     };

    //     // When the user clicks anywhere outside of the modal, close it
    //     window.onclick = function(event) {
    //       if (event.target == modal) {
    //         modal.style.display = "none";
    //       }
    //     };
    //   }
    // );
  });
});
