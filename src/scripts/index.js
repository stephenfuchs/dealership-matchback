import "../styles/index.scss";

import "bootstrap";
import DateRangePicker from "vanillajs-datepicker/DateRangePicker";

const elem = document.getElementById("dateRange");
new DateRangePicker(elem, {
  buttonClass: "btn",
  allowOneSidedRange: true,
});
