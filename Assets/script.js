$(function () {

  // Get current date and display
  const date = new Date();
  const dateContainer = document.getElementById("date-container");

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  dateContainer.textContent = `Today is ` + date.toLocaleString('en-IN', options);

  console.log(date);

  // Get current hour
  const currentHour = dayjs().hour();
  console.log(currentHour);

  // Save tasks to local storage and display on page reload
  $(".time-block").each(function () {
    const timeBlockId = parseInt(this.id.split("-")[1]);

    if (timeBlockId < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockId === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  $(".saveBtn").on("click", function () {
    const description = $(this).siblings(".description").val();
    const timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, description);
  });

  $(".time-block").each(function () {
    const timeBlockId = this.id;
    const savedDescription = localStorage.getItem(timeBlockId);

    if (savedDescription !== null) {
      $(this).find(".description").val(savedDescription);
    }
  });
});
