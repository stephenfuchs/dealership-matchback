console.log("HELLO");

const test = () => {
  console.log("this is a test");
};

import DateRangePicker from "node_modules/vanillajs-datepicker/js/DateRangePicker.js";

const elem = document.getElementById("foo");
const rangepicker = new DateRangePicker(elem, {
  buttonClass: "btn",
});
