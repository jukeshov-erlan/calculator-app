const buttonValues = [
  "AC",
  "CE",
  "%",
  "+/-",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

const operators = ["/", "*", "+", "-"];
const commands = ["AC", "CE", "=", "%", "+/-"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const display = document.querySelector(".display");

buttonValues.forEach((value) => {
  let button = document.createElement("button");
  button.innerHTML = `<i>${value}</i>`;
  switch (value) {
    case "AC":
      button.classList.add("clear");
      break;
    case "=":
      button.classList.add("equal");
      break;
    default:
      if (operators.includes(value)) {
        button.classList.add("operators");
        break;
      }
  }
  document.querySelector(".calculator").appendChild(button);

  button.addEventListener("click", () => {
    try {
      if (value === "AC") {
        display.value = "";
      } else if (value === "CE") {
        display.value = display.value.slice(0, -1);
      } else if (value === "+/-") {
        display.value = Number(display.value) * -1;
      } else if (value === "%") {
        display.value = Number(display.value) / 100;
      } else if (value === "=") {
        if (display.value !== "") {
          display.value = eval(display.value);
        }
      } else {
        const lastValue = display.value.slice(-1);
        if (operators.includes(value) && operators.includes(lastValue)) {
          display.value = display.value.slice(0, -1) + value;
        } else {
          display.value += value;
        }
      }
    } catch (err) {
      display.value = "Invalid Entry";
      setTimeout(() => {
        display.value = "";
      }, 1000);
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const lastValue = display.value.slice(-1);

  if (numbers.includes(key)) {
    display.value += key;
  } else if (operators.includes(key)) {
    if (operators.includes(lastValue)) {
      display.value = display.value.slice(0, -1) + key;
    } else {
      display.value += key;
    }
  } else if (key === "Enter" || key === "=") {
    if (display.value !== "") {
      display.value = eval(display.value);
    }
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key.toUpperCase() === "C" || key === "Escape") {
    display.value = "";
  } else if (key === "%") {
    display.value = Number(display.value) / 100;
  }
});
