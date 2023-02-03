import { createUser } from "../firebase/createUser.js";
import { isPseudoExist } from "../helpers/isPseudoExist.js";

function main() {
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelectorAll(".close");

    if (!isPseudoExist()) {
        modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
        closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
    } else {
        modalBtn.forEach((btn) => btn.addEventListener("click", () => {
            window.location.href = "/html/handmanGame.html";
        }));
    }

    FormValidate();
}

main();

// Function for validation
function validate(formData) {

    // All Regex
    const stringRegex = /^[a-zA-Z-]+$/;


    let isFormValid = true;

    // First name
    if (!formData[0].children[2].value.match(stringRegex) || formData[0].children[2].value.length < 2) {
        isFormValid = false;
        displayErrorMsg(formData[0], "Allé... Mets plus de caractères !");
    } else {
        removeErrorMsg(formData[0]);
    }

    // Check previous error
    if (isFormValid) {
        return true;
    } else {
        return false;
    }
}

// ----------------- ERRORS FUNCTIONS ----------------- // 
// Function for error messages
const displayErrorMsg = (element, message) => {
    const formData = element
    formData.setAttribute("data-error", message)
    formData.setAttribute("data-error-visible", true)
}

// Function for remove one error msg
const removeErrorMsg = (element) => {
    const formData = element
    formData.removeAttribute('data-error')
    formData.removeAttribute('data-error-visible')
}


// ----------------- MODAL FUNCTIONS & EVENTS ----------------- // 
// Functions for modal
function launchModal() {
    const modalbg = document.querySelector(".bground");
    modalbg.style.display = "block";

}

// Function for close modal
function closeModal() {
    const modalbg = document.querySelector(".bground");
    modalbg.style.display = "none";
}

// Close validation event
const closeBtn = document.querySelector("span.close");
const closeValidation = document.querySelector("button.btn-close");

closeBtn.addEventListener("click", closeModal);
closeValidation.addEventListener("click", closeModal);

// ----------------- VALIDATION FUNCTION ----------------- // 
// Display validation message
const validation = document.querySelector(".validation");
const formContent = document.querySelector("form");

function showValidation() {
    formContent.style.display = "none";
    validation.style.display = "block";
}

// Function for validate or not the form
function FormValidate() {
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', function (event) {
        const formData = document.querySelectorAll(".formData");
        event.preventDefault();
        if (validate(formData)) {
            showValidation();
            const inputPseudo = document.getElementById("pseudo");
            createUser(inputPseudo.value);
        } else {
            alert("Il y a un problème")
        }
    })
}
