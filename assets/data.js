function setupUI(user) {
  $(".card-title").text("Hi " + user.displayName + "!");
}

let cred;

// setup tasks
const setupTasks = (data, uid) => {
  cred = uid;

  $("#incomplete-tasks").empty();
  $("#completed-tasks").empty();

  $.each(data, function(index, doc) {
    const task = doc.data();

    let date = task.date;

    if (date) {
      // if there was a date attached
      const today = moment();
      const tomorrow = moment().add(1, "days");
      const yesterday = moment().subtract(1, "days");

      if (moment(date, "LL").isSame(today, "day")) {
        date = "Today";
      } else if (moment(date, "LL").isSame(tomorrow, "day")) {
        date = "Tomorrow";
      } else if (moment(date, "LL").isSame(yesterday, "day")) {
        date = "Yesterday";
      }
    }

    const li = $(`<li id="li-${index + 1}" class="to-do-item">`).append(`
       <p>
        <label>
        <input type="checkbox" class="check-incomplete" id="check-task-${index +
          1}">
          <span id=task-${index + 1} class="task" value=${doc.id}>${
      task.title
    }<span id="trash-${index +
      1}" class="fa fa-trash-alt delete" style="position: relative; top: 5px; margin-right: 5px; display: none;"></span></span>
        </label>
      </p>
      <div style="float: right; position: relative; top: 20px;" class="when" id="when-${index +
        1}">
        ${date}
      </div>
  `);

    if (task.state === "incomplete") {
      $("#incomplete-tasks").append(li);
    } else {
      $("#completed-tasks").append(li);
      $(`#check-task-${index + 1}`).attr("class", "check-complete");
      $(`#check-task-${index + 1}`).prop("checked", true);
    }
  });
};

// create new task
$("#add-task-form").on("submit", function(event) {
  event.preventDefault();
  const newTask = $("#new_task")
    .val()
    .trim();

  const dateInput = $("#prefDate")
    .val()
    .trim();

  let date;

  if (dateInput) {
    // if user input a date
    const today = moment();
    const tomorrow = moment().add(1, "days");
    const yesterday = moment().subtract(1, "days");

    if (moment(dateInput, "LL").isSame(today, "day")) {
      date = "Today";
    } else if (moment(dateInput, "LL").isSame(tomorrow, "day")) {
      date = "Tomorrow";
    } else if (moment(dateInput, "LL").isSame(yesterday, "day")) {
      date = "Yesterday";
    }
  }

  $("#new_task").val("");
  $("#prefDate").val("");

  // store new task in firebase
  db.collection("users")
    .doc(cred)
    .collection("tasks")
    .add({
      title: newTask,
      state: "incomplete",
      date: dateInput,
      unixTime: moment(dateInput).format("X")
    })
    .then(() => {})
    .catch(err => {
      console.log(err.message);
    });
});

$(document).on("click", ".delete", function(event) {
  event.preventDefault();

  // get the id attribute of the delete
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  deleteTask(id);
});

$(document).on("click", ".check-incomplete", function(event) {
  // get the id attribute of the check input
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  let when = $(`#when-${id}`)
    .text()
    .trim();

  if (when === "Today") {
    when = moment().format("LL");
  } else if (when === "Tomorrow") {
    when = moment()
      .add(1, "days")
      .format("LL");
  } else if (when === "Yesterday") {
    when = moment()
      .subtract(1, "days")
      .format("LL");
  }

  // store checked task in completed collection
  db.collection("users")
    .doc(cred)
    .collection("tasks")
    .add({
      title: $(`#task-${id}`).text(),
      state: "complete",
      date: when,
      unixTime: moment(when).format("X")
    })
    .then(() => {})
    .catch(err => {
      console.log(err.message);
    });

  // remove from incomplete section
  deleteTask(id);
});

$(document).on("click", ".check-complete", function(event) {
  // get the id attribute of the check input
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);

  let when = $(`#when-${id}`)
    .text()
    .trim();

  if (when === "Today") {
    when = moment().format("LL");
  } else if (when === "Tomorrow") {
    when = moment()
      .add(1, "days")
      .format("LL");
  } else if (when === "Yesterday") {
    when = moment()
      .subtract(1, "days")
      .format("LL");
  }

  // store checked task in incomplete collection
  db.collection("users")
    .doc(cred)
    .collection("tasks")
    .add({
      title: $(`#task-${id}`).text(),
      state: "incomplete",
      date: when,
      unixTime: moment(when).format("X")
    })
    .then(() => {})
    .catch(err => {
      console.log(err.message);
    });

  // remove from complete section
  deleteTask(id);
});

function deleteTask(id) {
  db.collection("users")
    .doc(cred)
    .collection("tasks")
    .doc($(`#task-${id}`).attr("value"))
    .delete()
    .then(function() {})
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

$(document).on("mouseenter", ".to-do-item", function() {
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);
  $(`#trash-${id}`).show();
});

$(document).on("mouseleave", ".to-do-item", function() {
  const id = $(this)
    .attr("id")
    .charAt($(this).attr("id").length - 1);
  $(`#trash-${id}`).hide();
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".datepicker");
  M.Datepicker.init(elems);
});