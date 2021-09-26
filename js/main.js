let body = document.querySelector("body");
let themeSelector = document.querySelector("#themeSelector");

let displayText = document.querySelector("#displayText");

let btnCalc = document.querySelector("#btn_calc");
let btnsFunct = document.querySelectorAll(".btn_funct");
let btnsMainPad = document.querySelectorAll(".btn_mainPad");

function setColorTheme(themeNr) {
  body.classList.remove("theme1");
  body.classList.remove("theme2");
  body.classList.remove("theme3");
  body.classList.add("theme" + themeNr);
}

function calculateResult(event) {
  console.log(event.target);
}

function clearInput(event) {
  console.log(event.target);
}

function handleMainPadInput(event) {
  console.log(event.target);
}

function init() {
  setColorTheme(2);
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
}

window.onload = init;
