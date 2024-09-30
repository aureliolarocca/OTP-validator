const sendOTP = document.querySelector("#sendOTP");
let currentOTP = [];

let inputSolution = [];
let codeOTP = document.querySelector("#codeOTP");
let randomNumber = () => {
  return Math.floor(Math.random() * 9) + 1;
};
let messageForOTP = document.querySelector("#otpNoSend");

function clickForOTP() {
  inputSolution = [];
  currentOTP = [];
  for (let i = 0; i < 4; i++) {
    currentOTP.push(randomNumber());
  }
  messageForOTP.innerHTML = "IL TUO CODICE ARRIVA!";
  messageForOTP.innerHTML = `${currentOTP.join(" ")}`;
  setTimeout(() => {
    messageForOTP.innerHTML = "Hai scordato il tuo codice?";
  }, 5000);

  return currentOTP;
}

sendOTP.addEventListener("click", clickForOTP);

function checkAndEnableInputs() {
  const inputs = document.querySelectorAll("input[type='number']");
  let allInputsValid = true;
  const verifyBtn = document.getElementById("verify");

  inputs.forEach((input, index) => {
    if (input.value !== "" && input.value >= 1 && input.value <= 9) {
      if (inputs[index + 1]) {
        inputs[index + 1].removeAttribute("disabled");

        inputs[index + 1].focus();
      }
    } else {
      for (let i = index + 1; i < inputs.length; i++) {
        inputs[i].setAttribute("disabled", true);
        inputs[i].value = "";
      }
      allInputsValid = false;
    }
  });

  if (allInputsValid) {
    verifyBtn.removeAttribute("disabled");
  } else {
    verifyBtn.setAttribute("disabled", true);
  }
}

document.querySelectorAll("input[type='number']").forEach((input) => {
  input.addEventListener("input", checkAndEnableInputs);
});

const verifyBtn = document.getElementById("verify");
function verifyInputs() {
  const inputs = document.querySelectorAll("input[type='number']");
  const inputValues = [];

  let allInputsValid = true;
  inputs.forEach((input) => {
    if (input.value === "" || input.value < 1 || input.value > 9) {
      allInputsValid = false;
    } else {
      inputValues.push(parseInt(input.value));
    }
  });

  if (allInputsValid) {
    inputSolution.push(...inputValues);
    console.log("Input Solution:", inputSolution);
  } else {
    alert("Inserisci numeri validi in tutti gli input!");
  }

  inputs.forEach((input) => {
    input.value = "";
  });
  if (
    currentOTP[0] === inputSolution[0] &&
    currentOTP[1] === inputSolution[1] &&
    currentOTP[2] === inputSolution[2] &&
    currentOTP[3] === inputSolution[3]
  ) {
    codeOTP.innerHTML = "IL TUO CODICE E' CORRETTO";
    inputSolution = [];
    setTimeout(() => {
      codeOTP.innerHTML = "";
    }, 4000);
  } else {
    codeOTP.innerHTML = "HAI SBAGLIATO IL CODICE";
    inputSolution = [];
    setTimeout(() => {
      codeOTP.innerHTML = "";
    }, 4000);
  }
}

verifyBtn.addEventListener("click", verifyInputs);
