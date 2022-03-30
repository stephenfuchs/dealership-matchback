import "../styles/index.scss";

import "bootstrap";

let dealership = document.querySelector(".header__dealership");
let startDate = document.querySelector(".header__dates--start");
let endDate = document.querySelector(".header__dates--end");

const addClient = (event) => {
  event.preventDefault();

  let clientData = {
    client: document.getElementById("clientName").value,
    start: document.getElementById("startDate").value,
    end: document.getElementById("endDate").value,
  };
  console.log(clientData.client);

  dealership.innerHTML = clientData.client;
  startDate.innerHTML = clientData.start;
  endDate.innerHTML = clientData.end;
};

let form = document.querySelector("form");
form.addEventListener("submit", addClient);
