$(document).ready(function() {
  // listen for auth status changes
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // get data
      db.collection("users").doc(user.uid).collection("incomplete").onSnapshot(function(snapshot) {
        setupTasks(snapshot.docs, "incomplete", user.uid);
      });
      db.collection("users").doc(user.uid).collection("complete").onSnapshot(function(snapshot) {
        setupTasks(snapshot.docs, "complete", user.uid);
      });
      setupUI(user); // display greeting
    }
  });

  // logout
  $("#logout").on("click", function(event) {
    event.preventDefault();
    auth.signOut().then(function() {
      window.location = "index.html"; // Go back to home page after sign out
    });
  });
});
