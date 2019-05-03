function setupUI(user) {
  $(".card-title").text("Hi " + user.displayName+ "!");
}

let cred;

// setup tasks
const setupTasks = (data, collection, uid) => {
  cred = uid;
  if (collection === "incomplete") {
    $("#incomplete-tasks").empty();

    $.each(data, function(index, doc) {
      const task = doc.data();
      const li = $("<li>").append(`
        <input type="checkbox" style="margin-bottom: 5px;" class="check-incomplete" id="check-incomplete-task-${index +
          1}">
        <div id=incomplete-task-${index +
          1} class="task" style="margin-top: 5px;" value=${doc.id}>${
        task.title
      }</div>
        <button class="delete-incomplete" id="delete-incomplete-task-${index +
          1}">Delete</button>
    `);
      $("#incomplete-tasks").append(li);
    });
  } else {

    $("#completed-tasks").empty();

    $.each(data, function(index, doc) {
      const task = doc.data();
      const li = $("<li>").append(`
      <input type="checkbox" style="margin-bottom: 5px;" class="check-complete" id="check-complete-task-${index +
        1}">
        <div id=complete-task-${index +
          1} class="task" style="margin-top: 5px;" value=${doc.id}>${
        task.title
      }</div>
        <button class="delete-complete" id="delete-complete-task-${index +
          1}">Delete</button>
    `);
      $("#completed-tasks").append(li);
    });
    $('.check-complete').prop('checked', true);
  }
};

// create new task
$("#add-task-form").on("submit", function(event) {
  event.preventDefault();

  const newTask = $("#new-task")
    .val()
    .trim();

  $("#new-task").val("");

  // store new task in firebase
  db.collection("users").doc(cred).collection("incomplete")
    .add({
      title: newTask
    })
    .then(() => {})
    .catch(err => {
      console.log(err.message);
    });
});

$(document).on("click", ".delete-incomplete", function(event) {
  event.preventDefault();

  // get the id attribute of the delete
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  deleteTask("incomplete", id);
});

$(document).on("click", ".delete-complete", function(event) {
  event.preventDefault();

  // get the id attribute of the delete
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  deleteTask("complete", id);
});

$(document).on("click", ".check-incomplete", function(event) {

  // get the id attribute of the check input
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  // store checked task in completed collection
  db.collection("users").doc(cred).collection("complete")
    .add({
      title: $(`#incomplete-task-${id}`).text()
    })
    .then(() => {})
    .catch(err => {
      console.log(err.message);
    });

  // remove checked task from incomplete collection
  deleteTask("incomplete", id);
});

$(document).on("click", ".check-complete", function(event) {

  // get the id attribute of the check input
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  // store checked task in incomplete collection
  db.collection("users").doc(cred).collection("incomplete")
    .add({
      title: $(`#complete-task-${id}`).text()
    })
    .then(() => {})
    .catch(err => {
      console.log(err.message);
    });

  // remove checked task from incomplete collection
  deleteTask("complete", id);
});

function deleteTask(collectionName, id) {
  db.collection("users").doc(cred).collection(collectionName)
    .doc($(`#${collectionName}-task-${id}`).attr("value"))
    .delete()
    .then(function() {})
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}
