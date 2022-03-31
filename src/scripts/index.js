import "../styles/index.scss";

import * as bootstrap from "bootstrap";

const form = document.querySelector("form");
const dealership = document.querySelector(".header__dealership");
const startDate = document.querySelector(".header__dates--start");
const endDate = document.querySelector(".header__dates--end");
const btnNew = document.getElementById("btnNew");

var myModal = new bootstrap.Modal(document.getElementById("clientForm"));
myModal.show();
// Form Functionality
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let clientData = {
    client: event.currentTarget.clientName.value,
    start: event.currentTarget.startDate.value,
    end: event.currentTarget.endDate.value,
  };

  let formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-us", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  dealership.innerHTML = clientData.client;
  startDate.innerHTML = formatDate(clientData.start);
  endDate.innerHTML = formatDate(clientData.end);
});

// Reset form
btnNew.addEventListener("click", function () {
  if (
    confirm(
      `Are you sure you want to create a new report? The current data will be erased`
    )
  ) {
    location.reload();
  }
});
