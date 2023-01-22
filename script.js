"use strict";

const cardDigits = document.querySelectorAll(".card__1-digits");
const cardName = document.querySelector(".card__1-name");
const cardExpDate = document.querySelector(".card__1-expdate");
const cardCvc = document.querySelector(".cvc__number--back");
const formInputs = document.querySelectorAll(".form-input");
const formErrors = document.querySelectorAll(".error-msg");

document.querySelector(".submit-btn").addEventListener("click", function () {
  cardName.textContent = formInputs[0].value.toUpperCase();
  cardDigits[0].textContent = formInputs[1].value.slice(0, 4);
  cardDigits[1].textContent = formInputs[1].value.slice(4, 8);
  cardDigits[2].textContent = formInputs[1].value.slice(8, 12);
  cardDigits[3].textContent = formInputs[1].value.slice(12, 16);
  cardExpDate.textContent = `${formInputs[2].value}/${formInputs[3].value}`;
  cardCvc.textContent = formInputs[4].value;
  let verifyCount = 0;

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].style.borderColor = "hsl(270, 3%, 87%)";
    if (i !== 4) {
      formErrors[i].classList.remove("error-displayed");
    }
  }

  if (!/^[a-zA-Z\s]+$/.test(formInputs[0].value)) {
    formErrors[0].classList.add("error-displayed");
    if (formInputs[0].value == "") {
      formErrors[0].textContent = "Can't be blank.";
    } else formErrors[0].textContent = "Wrong format, letters only.";
    formInputs[0].style.borderColor = "red";
    verifyCount++;
  }

  if (!/^[0-9]{16}$/.test(formInputs[1].value)) {
    formErrors[1].classList.add("error-displayed");
    if (formInputs[1].value == "") {
      formErrors[1].textContent = "Can't be blank.";
    } else
      formErrors[1].textContent = "Wrong format, must be a 16-digit number.";

    if (
      /^[0-9]+$/.test(formInputs[1].value) &&
      formInputs[1].value.length < 16
    ) {
      formErrors[1].textContent = "Number must contain 16 digits.";
    }
    formInputs[1].style.borderColor = "red";
    verifyCount++;
  }

  if (
    !/^[0-9]{2}$/.test(formInputs[2].value) ||
    !/^[0-9]{2}$/.test(formInputs[3].value)
  ) {
    formErrors[2].classList.add("error-displayed");
    formErrors[2].textContent = "Wrong format, must be a 2-digit number.";
    if (!/^[0-9]+$/.test(formInputs[2].value))
      formInputs[2].style.borderColor = "red";
    if (!/^[0-9]+$/.test(formInputs[3].value))
      formInputs[3].style.borderColor = "red";

    if (formInputs[2].value == "") {
      formErrors[2].textContent = "Can't be blank.";
      formInputs[2].style.borderColor = "red";
    }

    if (formInputs[3].value == "") {
      formErrors[2].textContent = "Can't be blank.";
      formInputs[3].style.borderColor = "red";
    }

    if (formInputs[2].value.length === 1) {
      formErrors[2].textContent = "Must be a 2-digit number.";
      formInputs[2].style.borderColor = "red";
    }

    if (formInputs[3].value.length === 1) {
      formErrors[2].textContent = "Must be a 2-digit number.";
      formInputs[3].style.borderColor = "red";
    }
    verifyCount++;
  }

  if (Number(formInputs[2].value) > 12 || formInputs[2].value === "00") {
    formErrors[2].classList.add("error-displayed");
    formErrors[2].textContent = "Invalid month value.";
    formInputs[2].style.borderColor = "red";
    verifyCount++;
  }

  if (
    Number(formInputs[3].value) === 0 ||
    Number(formInputs[3].value) < 23 ||
    formInputs[3].value === "00"
  ) {
    formErrors[2].classList.add("error-displayed");
    formErrors[2].textContent = "Invalid year value.";
    formInputs[3].style.borderColor = "red";
    verifyCount++;
  }

  if (!/^[0-9]{3}$/.test(formInputs[4].value)) {
    formErrors[3].classList.add("error-displayed");
    formErrors[3].textContent = "Wrong format, must be a 3-digit number.";
    formInputs[4].style.borderColor = "red";

    if (
      /^[0-9]+$/.test(formInputs[4].value) &&
      formInputs[4].value.length < 3
    ) {
      formErrors[3].textContent = "Must be a 3-digit number.";
      formInputs[4].style.borderColor = "red";
    }
    verifyCount++;
  }

  if (verifyCount === 0) {
    document.querySelector("form").style.display = "none";
    document.querySelector(".thanks--proceed").style.display = "";
  }
});
