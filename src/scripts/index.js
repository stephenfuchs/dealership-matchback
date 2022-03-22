import "../styles/index.scss";

console.log("webpack starterkit");

import DateRangePicker from "vanillajs-datepicker/DateRangePicker";

const elem = document.getElementById("foo");
new DateRangePicker(elem, {
  buttonClass: "btn",
  allowOneSidedRange: true,
});
