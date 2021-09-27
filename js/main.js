let body = document.querySelector("body");
let themeSelector = document.querySelector("#themeSelector");

let displayText = document.querySelector("#displayText");
let displayOperator = document.querySelector("#displayOperator");

let btnCalc = document.querySelector("#btn_calc");
let btnsFunct = document.querySelectorAll(".btn_funct");
let btnsMainPad = document.querySelectorAll(".btn_mainPad");

let operand1 = "0";
let operand2 = "0";
let operator = "";
let result = "";
let setFirstOperand = true;
let operandHasComma = false;

function setInitialColorTheme() {
  if (localStorage.getItem("calculatorTheme")) {
    setColorTheme(localStorage.getItem("calculatorTheme"));
    themeSelector.value = localStorage.getItem("calculatorTheme");
  } else {
    setColorTheme(1);
  }
}

function setColorTheme(themeNr) {
  body.classList.remove("theme1");
  body.classList.remove("theme2");
  body.classList.remove("theme3");

  localStorage.setItem("calculatorTheme", themeNr);
  body.classList.add("theme" + themeNr);
}

function calculateResult() {
  if (operator != "" && !setFirstOperand) {
    operand1 = operand1.replace(",", ".");
    operand2 = operand2.replace(",", ".");

    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    switch (operator) {
      case "+":
        result = operand1 + operand2;
        break;
      case "-":
        result = operand1 - operand2;
        break;
      case "x":
        result = operand1 * operand2;
        break;
      case "/":
        if (operand2 == 0) {
          displayText.innerText = "error";
          displayOperator.innerText = "";
          setStartConditions();
          return;
        } else {
          result = operand1 / operand2;
        }
        break;
    }

    if (result.toString().length >= 8) {
      result = result.toFixed(8);
    } else {
      result = result.toString();
    }

    if (result.indexOf(".") != -1) {
      while (result[result.length - 1] == "0") {
        result = result.slice(0, result.length - 1);
      }
    }
    result = result.replace(".", ",");
    displayText.innerText = result;
  }
  setStartConditions();
}

function setStartConditions() {
  operand1 = "0";
  operand2 = "0";
  operator = "";
  setFirstOperand = true;
  operandHasComma = false;
  displayOperator.innerText = "";
}

function clearInput(event) {
  if (event.target.value == "reset") {
    displayText.innerText = "0";
    setStartConditions();
  } else {
    if (setFirstOperand) {
      operand1 = operand1.slice(0, operand1.length - 1);
      operand1 == "" ? (operand1 = "0") : "";
    } else {
      operand2 = operand2.slice(0, operand2.length - 1);
      operand2 == "" ? (operand2 = "0") : "";
    }
    showNumberInDisplay();
  }
}

function handleMainPadInput(event) {
  if (!isNaN(parseInt(event.target.value))) {
    handleNextNumberInput(event.target.value);
  } else if (event.target.value === ",") {
    if (operandHasComma) {
      return;
    } else {
      operandHasComma = true;
      handleNextNumberInput(event.target.value);
    }
  } else {
    setFirstOperand = false;
    operandHasComma = false;
    operator == "" ? showNumberInDisplay() : "";
    operator = event.target.value;
    showSelectedOperationInDisplay(event.target.value);
  }
}

function handleNextNumberInput(nextDigit) {
  if (setFirstOperand) {
    if ((operand1 == "0" && nextDigit == "0") || operand1.length >= 9) {
      return;
    }
    operand1 == "0"
      ? (operand1 = nextDigit)
      : (operand1 = operand1 + nextDigit);
  } else {
    if ((operand2 == "0" && nextDigit == "0") || operand2.length >= 9) {
      return;
    }
    operand2 == "0"
      ? (operand2 = nextDigit)
      : (operand2 = operand2 + nextDigit);
  }
  showNumberInDisplay();
}

function showSelectedOperationInDisplay(operator) {
  displayOperator.innerText = operator;
  setFirstOperand = false;
}

function showNumberInDisplay() {
  setFirstOperand
    ? (displayText.innerText = operand1)
    : (displayText.innerText = operand2);
}

function handleKeyboardInput(event) {
  event.preventDefault();

  switch (event.key) {
    case "1":
      document.querySelector("#btn_1").click();
      break;
    case "2":
      document.querySelector("#btn_2").click();
      break;
    case "3":
      document.querySelector("#btn_3").click();
      break;
    case "4":
      document.querySelector("#btn_4").click();
      break;
    case "5":
      document.querySelector("#btn_5").click();
      break;
    case "6":
      document.querySelector("#btn_6").click();
      break;
    case "7":
      document.querySelector("#btn_7").click();
      break;
    case "8":
      document.querySelector("#btn_8").click();
      break;
    case "9":
      document.querySelector("#btn_9").click();
      break;
    case "0":
      document.querySelector("#btn_0").click();
      break;
    case ",":
      document.querySelector("#btn_comma").click();
      break;
    case "+":
      document.querySelector("#btn_add").click();
      break;
    case "-":
      document.querySelector("#btn_subtract").click();
      break;
    case "*":
      document.querySelector("#btn_multiply").click();
      break;
    case "/":
      document.querySelector("#btn_divide").click();
      break;
    case "Enter":
      document.querySelector("#btn_calc").click();
      break;
    case "Backspace":
      document.querySelector("#btn_del").click();
      break;
  }
}

function init() {
  setInitialColorTheme();
  showNumberInDisplay();
  themeSelector.addEventListener("change", (event) => {
    setColorTheme(event.target.value);
  });

  btnCalc.addEventListener("click", calculateResult);
  btnsFunct.forEach((btn) => {
    btn.addEventListener("click", clearInput);
  });
  btnsMainPad.forEach((btn) => {
    btn.addEventListener("click", handleMainPadInput);
  });

  window.addEventListener("keydown", handleKeyboardInput);
}

window.onload = init;
