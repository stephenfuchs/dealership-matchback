import "../styles/index.scss";
import Papa from "papaparse";
import html2pdf from "html2pdf.js";

const startup = document.getElementById("startup");
const app = document.getElementById("app");
const form = document.querySelector("form");
const dealership = document.querySelector(".header__dealership");
const startDate = document.querySelector(".header__dates--start");
const endDate = document.querySelector(".header__dates--end");
const btnNew = document.getElementById("btnNew");
const btnModify = document.getElementById("btnModify");
const btnPDF = document.getElementById("btnPDF");
const pdfOutput = document.getElementById("pdfOutput");
const tableNew = document.querySelector(".buyers-new__table");
const tableUsed = document.querySelector(".buyers-used__table");

// TOGGLE DISPLAY
function toggleApp() {
  app.classList.toggle("d-none");
  startup.classList.toggle("d-none");
}

// RESET APP
function reset() {
  if (
    confirm(
      `Are you sure you want to create a new report? The current data will be erased`
    )
  ) {
    location.reload();
  }
}

btnNew.addEventListener("click", reset);

// FORM FUNCTIONALITY
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

  parseCSV();
  toggleApp();
});

// MODIFY DATA
btnModify.addEventListener("click", toggleApp);

// CREATE PDF
function createPDF() {
  pdfOutput.classList.add("pdf");
  const opt = {
    margin: 0,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      allowTaint: true,
      scale: 2,
      useCORS: true,
    },
    pagebreak: {
      before: [".buyers-new", ".buyers-used"],
    },
    jsPDF: {
      unit: "in",
      format: "letter",
    },
  };
  html2pdf()
    .set(opt)
    .from(pdfOutput)
    .save()
    .then(function () {
      pdfOutput.classList.remove("pdf");
    });
}

btnPDF.addEventListener("click", createPDF);

// PARSE CSV DATA
function parseCSV() {
  Papa.parse(document.getElementById("csvFile").files[0], {
    download: true,
    header: true,
    complete: function (results) {
      let isNew = results.data.filter((purchase) => purchase.condition == "N");
      let isUsed = results.data.filter((purchase) => purchase.condition == "U");

      createTableData(isNew, tableNew);
      createTableData(isUsed, tableUsed);
    },
  });
}

// CREATE TABLE FROM DATA
function createTableData(condition, location) {
  condition.forEach((cust) => {
    let row = document.createElement("tr");

    Object.values(cust).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    location.appendChild(row);
  });
}
