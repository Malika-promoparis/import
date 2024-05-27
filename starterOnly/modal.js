// DOM Elements
const x = document.getElementById("myTopnav");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const baliseNom = document.getElementById("last");
const baliseFirst = document.getElementById("first");
const baliseMail = document.getElementById("email");
const baliseDateNaissance = document.getElementById("birthdate");
const baliseQuantite = document.getElementById("quantity");
const baliseRadio = document.querySelectorAll("input[type=radio]");
const baliseCheckbox1 = document.getElementById("checkbox1");

function editNav() {
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//On écoute le click sur la croix pour fermer la modale
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Fonction qui permet de fermer la modale
function closeModal() {
  modalbg.style.display = "none";
}

/**
 * Cette fonction prend un nom et un prenom en paramètre et valide qu'il sont *au bon format
 * ici : deux caractères au minimum
 * @param {string} nom
 * @param {string} prenom
 * @throws {Error}
 */
function validerNomPrenom(nom, prenom) {
  // On vérifie que le nom et le prénom sont au moins de 2 caractères
  if (nom.length < 2) {
    baliseNom.parentElement.setAttribute(
      "data-error",
      "Le nom est trop court."
    );
    baliseNom.parentElement.setAttribute("data-error-visible", "true");
  } else {
    baliseNom.parentElement.removeAttribute("data-error");
    baliseNom.parentElement.removeAttribute("data-error-visible");
  }
  if (prenom.length < 2) {
    baliseFirst.parentElement.setAttribute(
      "data-error",
      "Le prénom est trop court."
    );
    baliseFirst.parentElement.setAttribute("data-error-visible", "true");
  } else {
    baliseFirst.parentElement.removeAttribute("data-error");
    baliseFirst.parentElement.removeAttribute("data-error-visible");
  }
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format
 * ici : une adresse email valide
 * @param {string} email
 * @throws {Error}
 */
function validerEmail(email) {
  // On crée une expression régulière pour valider l'email
  let emailRegExp = new RegExp(
    "^([a-z0-9._%+-]+)@([a-z0-9.-]+)\\.([a-z]{2,})$"
  );
  // On vérifie que l'email est valide
  if (!emailRegExp.test(email)) {
    baliseMail.parentElement.setAttribute(
      "data-error",
      "L'email n'est pas valide."
    );
    baliseMail.parentElement.setAttribute("data-error-visible", "true");
  } else {
    baliseMail.parentElement.removeAttribute("data-error");
    baliseMail.parentElement.removeAttribute("data-error-visible");
  }
}

/**
 * Cette fonction prend une date de naissance en paramètre et valide qu'elle est au bon format
 * et qu'elle n'est pas dans le futur.
 * @param {string} birthdate
 * @throws {Error}
 */
function validerDateNaissance(birthdate) {
  // On crée deux objets Date pour comparer les dates
  let dateNaissance = new Date(birthdate);
  let dateAujourdhui = new Date();

  // On réinitialise les erreurs
  baliseDateNaissance.parentElement.removeAttribute("data-error");
  baliseDateNaissance.parentElement.removeAttribute("data-error-visible");

  // On vérifie que la date est valide
  if (isNaN(dateNaissance.getTime())) {
    baliseDateNaissance.parentElement.setAttribute(
      "data-error",
      "La date de naissance n'est pas valide."
    );
    baliseDateNaissance.parentElement.setAttribute(
      "data-error-visible",
      "true"
    );
    return;
  }
  // On vérifie que la date n'est pas dans le futur
  if (dateNaissance > dateAujourdhui) {
    baliseDateNaissance.parentElement.setAttribute(
      "data-error",
      "Vous devez déjà être en vie pour vous inscrire."
    );
    baliseDateNaissance.parentElement.setAttribute(
      "data-error-visible",
      "true"
    );
    return;
  }
  // On vérifie que l'utilisateur a au moins 18 ans
  // On compare les années et les mois
  let age = dateAujourdhui.getFullYear() - dateNaissance.getFullYear();
  let m = dateAujourdhui.getMonth() - dateNaissance.getMonth();
  // Si l'utilisateur n'a pas encore eu son anniversaire ce mois-ci, on retire 1 an
  if (
    m < 0 ||
    (m === 0 && dateAujourdhui.getDate() < dateNaissance.getDate())
  ) {
    age--;
  }
  // Si l'utilisateur n'a pas 18 ans, on lève une erreur
  if (age < 18) {
    baliseDateNaissance.parentElement.setAttribute(
      "data-error",
      "Vous devez être majeur pour vous inscrire."
    );
    baliseDateNaissance.parentElement.setAttribute(
      "data-error-visible",
      "true"
    );
    return;
  }
  // On vérifie que l'utilisateur n'a pas plus de 120 ans
  if (age > 120) {
    baliseDateNaissance.parentElement.setAttribute(
      "data-error",
      "Vous devez être encore en vie pour vous inscrire."
    );
    baliseDateNaissance.parentElement.setAttribute(
      "data-error-visible",
      "true"
    );
    return;
  }
}

/**
 * Cette fonction prend une quantité en paramètre et valide qu'elle est au bon format
 * ici : un nombre entier
 * @param {number} quantite
 * @throws {Error}
 */
function validerQuantiteDeTournois(quantite) {
  // On réinitialise les erreurs
  baliseQuantite.parentElement.removeAttribute("data-error");
  baliseQuantite.parentElement.removeAttribute("data-error-visible");
  // On vérifie que la quantité n'est pas vide et est un nombre
  if (quantite === "" || isNaN(quantite)) {
    baliseQuantite.parentElement.setAttribute(
      "data-error",
      "La quantité est vide ou n'est pas un nombre."
    );
    baliseQuantite.parentElement.setAttribute("data-error-visible", "true");
    return;
  }
  // On vérifie que la quantité est un entier
  if (!Number.isInteger(parseFloat(quantite))) {
    baliseQuantite.parentElement.setAttribute(
      "data-error",
      "La quantité n'est pas un entier."
    );
    baliseQuantite.parentElement.setAttribute("data-error-visible", "true");
    return;
  }
  // On vérifie que la quantité est comprise entre 0 et 99 inclus
  if (quantite < 0 || quantite > 99) {
    baliseQuantite.parentElement.setAttribute(
      "data-error",
      "La quantité doit être comprise entre 0 et 99."
    );
    baliseQuantite.parentElement.setAttribute("data-error-visible", "true");
    return;
  }
}

function validateRadioButtons(radioButtons) {
  let isSelected = false;

  // On réinitialise les erreurs
  radioButtons[0].parentElement.removeAttribute("data-error");
  radioButtons[0].parentElement.removeAttribute("data-error-visible");
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      isSelected = true;
      break;
    }
  }

  if (!isSelected) {
    radioButtons[0].parentElement.setAttribute(
      "data-error",
      "Veuillez sélectionner au moins une option."
    );
    radioButtons[0].parentElement.setAttribute("data-error-visible", "true");
    return;
  }
}

function validateCGU(baliseCheckbox1) {
  // On réinitialise les erreurs
  baliseCheckbox1.parentElement.removeAttribute("data-error");
  baliseCheckbox1.parentElement.removeAttribute("data-error-visible");
  if (!baliseCheckbox1.checked) {
    baliseCheckbox1.parentElement.setAttribute(
      "data-error",
      "veuillez accepter les conditions d'utilisation"
    );
    baliseCheckbox1.parentElement.setAttribute("data-error-visible", "true");
  }
}

function validate(event) {
  // On empêche le formulaire de s'envoyer
  event.preventDefault();
  // On récupère les valeurs des champs
  let nom = baliseNom.value;
  let prenom = baliseFirst.value;
  // On appelle la fonction pour valider le nom et le prénom
  validerNomPrenom(nom, prenom);
  let email = baliseMail.value;
  // On appelle la fonction pour valider l'email
  validerEmail(email);
  let dateNaissance = baliseDateNaissance.value;
  // On appelle la fonction pour valider la date de naissance
  validerDateNaissance(dateNaissance);
  let quantite = baliseQuantite.value;
  validerQuantiteDeTournois(quantite);
  let radioButtons = baliseRadio;
  validateRadioButtons(radioButtons);
  validateCGU(baliseCheckbox1);
}
