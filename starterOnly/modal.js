function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const mainForm = document.getElementById("main-form");

mainForm.addEventListener("submit", (event) => {
  // console.log("click");
})


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


//Fermeture du formulaire
const closeModalBtn = document.querySelector(".close");
closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
  form.reset(); //reset du formulaire à la fermeture
}

//Fonction pour supprimer la div d'erreur si elle existe

function deleteDivError(idValue) {
  let existingError = idValue.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

}

//Fonction pour supprimer la div d'erreur si elle existe, dans les boutons à checker
function deleteDivErrorList(idValue) {
  if (idValue instanceof NodeList) {
    let tournamentDiv = document.getElementById("tournamentLocation");
    let existingError = tournamentDiv.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.remove();
    }
  } else {
    let existingError = idValue.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }
}

//Fonction pour afficher les erreurs dans le HTML
function createDivError(idValue, messageError) {

  deleteDivError(idValue)

  let divError = document.createElement("div");
  divError.classList.add("error-message");
  let paraError = document.createElement("p");
  divError.appendChild(paraError);
  paraError.textContent = messageError;


  if (idValue.type === "checkbox") {
    let labelForCheckbox = document.querySelector(`label[for="${idValue.id}"]`);
    if (labelForCheckbox) {
      labelForCheckbox.parentNode.insertBefore(divError, labelForCheckbox.nextSibling);
      return;
    }
  }



  idValue.parentNode.insertBefore(divError, idValue.nextSibling);
}


//Fonction pour afficher les erreurs dans le HTML sous les boutons à checker
function createDivErrorList(idValue, messageError) {
  deleteDivErrorList(idValue);

  let divError = document.createElement("div");
  divError.classList.add("error-message");
  let paraError = document.createElement("p");
  divError.appendChild(paraError);
  paraError.textContent = messageError;

  if (idValue instanceof NodeList) {
    let tournamentDiv = document.getElementById("tournamentLocation");
    tournamentDiv.parentNode.insertBefore(divError, tournamentDiv.nextSibling);
  } else {

    idValue.parentNode.insertBefore(divError, idValue.nextSibling);
  }
}


//Création de fonctions pour les élémens redondants 

//Fonction qui vérifie que le champs n'est pas vide
function isEmpty(idValue, messageError) {
  // let messageError;
  if (idValue.value.trim() === "") {
    messageError = `Le champ ${idValue.name} ne doit pas être vide`;
    createDivError(idValue, messageError)
    return true;

  }
  else {

    deleteDivError(idValue)
  }
  return false;
}

//Fonction qui vérifie que le champs comprend au moins 2 caractères
function checkLength(idValue, messageError) {

  if (idValue.value.trim().length < 2) {
    messageError = `Le champ ${idValue.name} doit contenir au moins 2 caractères`;
    createDivError(idValue, messageError)
  }
}


//Fonction vérification du prénom "first"
function checkFirst(idValue) {

  if (!isEmpty(idValue)) {
    checkLength(idValue)
  }
}

//Fonction vérification du nom "last"
function checkLast(idValue) {

  if (!isEmpty(idValue)) {
    checkLength(idValue)
  }
}
//Fonction vérification de l'email "email"
function checkEmail(idValue) {

  if (!isEmpty(idValue)) {
    const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

    if (!regex.test(idValue.value.trim())) {
      messageError = `Le champ ${idValue.name} doit être de forme valide`;
      createDivError(idValue, messageError)
    }
  }
}

//Fonction vérification de la date de naissance "birthdate"
function checkBirthdate(idValue) {
  if (!isEmpty(idValue)) {

    const currentYear = new Date().getFullYear();
    const regex = new RegExp("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19[0-9]{2}|20[0-" + (currentYear - 2000) + "]{2})$");

    if (!regex.test(idValue.value.trim())) {
      messageError = `Le champ ${idValue.name} doit être de forme valide`;
      createDivError(idValue, messageError)
    }
  }
}

//Fonction vérification du nombre de tournois
function checkTournamentNumber(idValue) {
  if (!isEmpty(idValue)) {


    const intValue = parseInt(idValue.value.trim(), 10);

    if (intValue.toString() !== idValue.value.trim()) {
      messageError = `Veuillez entrer uniquement un nombre entier`;
      createDivError(idValue, messageError)
    }

    if (intValue < 0 || intValue > 99) {
      messageError = `Vous devez mettre un nombre de tournois entre 0 et 99`;
      createDivError(idValue, messageError)
    }

  }
};


//Fonction pour demander le prochain lieu de tournoi

function tournamentChecked(idValue) {
  deleteDivErrorList(idValue);

  let place = "";
  for (let i = 0; i < idValue.length; i++) {
    if (idValue[i].checked) {
      place = idValue[i].value;
      break;
    }
  }

  if (place === "") {
    messageError = "Aucune option n'a été cochée !";
    createDivErrorList(idValue, messageError)
  }
  console.log(place);
}

//Fonction qui vérifie que les conditions d'utilisations sont checké
function conditionAccepted(idValue) {
  let accepted = idValue.checked;
  if (accepted) {
    deleteDivError(idValue);
  } else {
    messageError = "Vous devez accepter les conditions!";
    createDivError(idValue, messageError);
  }
}

//Fonction qui vérifie si la newsletter est coché, facultative
function newsLetterCheck(idValue){
  let accepted = idValue.checked;
  console.log(accepted);
}

//Traitement du formulaire
const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const first = document.getElementById("first");
  checkFirst(first);


  const last = document.getElementById("last");
  checkLast(last);

  const email = document.getElementById("email");
  checkEmail(email);

  const birthdate = document.getElementById("birthdate");
  checkBirthdate(birthdate);

  const tournamentNumber = document.getElementById("quantity");
  checkTournamentNumber(tournamentNumber);

  const tournamentPlace = document.querySelectorAll('input[name="location"]');
  tournamentChecked(tournamentPlace);

  const conditions = document.getElementById("checkbox1");
  conditionAccepted(conditions);

  const newsletter = document.getElementById("checkbox2");
  newsLetterCheck(newsletter);
})