// @ts-nocheck
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
const ModalSuccess = document.getElementById("ModalSuccess");
const closeSuccessSubmit = document.getElementById("closeSuccessSubmit");
const closeSuccessSpan = document.getElementById("closeSuccessSpan");
const form = document.querySelector("form");
const btnNav = document.querySelector("#btn_hamb");

function editNav() {
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Toggle navbar
btnNav.addEventListener("click", () =>
  document.querySelector(".list").classList.toggle("menu_toggle")
);

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
 * Cette fonction prend un nom et un prenom en paramètre et valide qu'il sont au bon format
 * ici : deux caractères au minimum
 * @param {string} nom
 * @param {string} prenom
 * @throws {Error}
 */
function validerNomPrenom(nom, prenom) {
  // On crée une expression régulière pour valider le nom et le prénom
  let nameRegExp = new RegExp("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$");
  let isValid = true;
  // On vérifie que le nom et le prénom sont au moins de 2 caractères
  if (!nameRegExp.test(nom)) {
    baliseNom.parentElement.setAttribute(
      "data-error",
      "Le nom est invalide. Il doit contenir au moins 2 caractères et ne peut contenir que des lettres (minuscules ou majuscules), des lettres accentuées et des tirets."
    );
    baliseNom.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    baliseNom.parentElement.removeAttribute("data-error");
    baliseNom.parentElement.removeAttribute("data-error-visible");
  }
  if (!nameRegExp.test(prenom)) {
    baliseFirst.parentElement.setAttribute(
      "data-error",
      "Le prénom est invalide. Il doit contenir au moins 2 caractères et ne peut contenir que des lettres (minuscules ou majuscules), des lettres accentuées et des tirets."
    );
    baliseFirst.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    baliseFirst.parentElement.removeAttribute("data-error");
    baliseFirst.parentElement.removeAttribute("data-error-visible");
  }
  return isValid;
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
  let isValid = true;
  // On vérifie que l'email est valide
  if (!emailRegExp.test(email)) {
    baliseMail.parentElement.setAttribute(
      "data-error",
      "L'email n'est pas valide."
    );
    baliseMail.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    baliseMail.parentElement.removeAttribute("data-error");
    baliseMail.parentElement.removeAttribute("data-error-visible");
  }
  return isValid;
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
  let isValid = true;

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
    isValid = false;
  }
  // On vérifie que la date n'est pas dans le futur
  else if (dateNaissance > dateAujourdhui) {
    baliseDateNaissance.parentElement.setAttribute(
      "data-error",
      "Vous devez déjà être en vie pour vous inscrire."
    );
    baliseDateNaissance.parentElement.setAttribute(
      "data-error-visible",
      "true"
    );
    isValid = false;
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
    isValid = false;
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
    isValid = false;
  }
  return isValid;
}

/**
 * Cette fonction prend une quantité en paramètre et valide qu'elle est au bon format
 * ici : un nombre entier
 * @param {number} quantite
 * @throws {Error}
 */
function validerQuantiteDeTournois(quantite) {
  let isValid = true;
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
    isValid = false;
  }
  // On vérifie que la quantité est un entier
  else if (!Number.isInteger(parseFloat(quantite))) {
    baliseQuantite.parentElement.setAttribute(
      "data-error",
      "La quantité n'est pas un entier."
    );
    baliseQuantite.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }
  // On vérifie que la quantité est comprise entre 0 et 99 inclus
  else if (quantite < 0 || quantite > 99) {
    baliseQuantite.parentElement.setAttribute(
      "data-error",
      "La quantité doit être comprise entre 0 et 99."
    );
    baliseQuantite.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }
  return isValid;
}

/**
 * Cette fonction prend les boutons radio en paramètre et valide qu'au moins * un est sélectionné
 * @param {string} radioButtons
 * @throws {Error}
 */
function validateRadioButtons(radioButtons) {
  let isSelected = false;
  let isValid = true;

  // On réinitialise les erreurs
  radioButtons[0].parentElement.removeAttribute("data-error");
  radioButtons[0].parentElement.removeAttribute("data-error-visible");
  // On vérifie si un bouton radio est sélectionné
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      isSelected = true;
      break;
    }
  }
  // On vérifie qu'au moins un bouton radio est sélectionné
  if (!isSelected) {
    radioButtons[0].parentElement.setAttribute(
      "data-error",
      "Veuillez sélectionner au moins une option."
    );
    radioButtons[0].parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }
  return isValid;
}

function validateCGU(baliseCheckbox1) {
  let isValid = true;
  // On réinitialise les erreurs
  baliseCheckbox1.parentElement.removeAttribute("data-error");
  baliseCheckbox1.parentElement.removeAttribute("data-error-visible");
  // On vérifie que la case est cochée
  if (!baliseCheckbox1.checked) {
    baliseCheckbox1.parentElement.setAttribute(
      "data-error",
      "veuillez accepter les conditions d'utilisation"
    );
    baliseCheckbox1.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }
  return isValid;
}

// Fonction de validation du formulaire
function validate(event) {
  // On empêche le formulaire de s'envoyer
  event.preventDefault();

  // On récupère les valeurs des champs
  let nom = baliseNom.value;
  let prenom = baliseFirst.value;
  let email = baliseMail.value;
  let dateNaissance = baliseDateNaissance.value;
  let quantite = baliseQuantite.value;
  let radioButtons = baliseRadio;

  // On initialise une variable pour suivre les erreurs
  let hasError = false;

  // On appelle les fonctions de validation
  if (!validerNomPrenom(nom, prenom)) hasError = true;
  if (!validerEmail(email)) hasError = true;
  if (!validerDateNaissance(dateNaissance)) hasError = true;
  if (!validerQuantiteDeTournois(quantite)) hasError = true;
  if (!validateRadioButtons(radioButtons)) hasError = true;
  if (!validateCGU(baliseCheckbox1)) hasError = true;

  // Si pas d'erreur, on masque le formulaire et on affiche le message de confirmation
  if (!hasError) {
    modalbg.style.display = "none";
    ModalSuccess.style.display = "block";
  }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
  form.reset();
  // Réinitialiser les messages d'erreur
  document.querySelectorAll("[data-error]").forEach((element) => {
    element.removeAttribute("data-error");
    element.removeAttribute("data-error-visible");
  });
}

// Fonction pour fermer la confirmation
function closeSuccess() {
  ModalSuccess.style.display = "none";
  modalbg.style.display = "none";
  resetForm(); // Réinitialiser le formulaire
}

// Écouteur pour le span de confirmation
closeSuccessSpan.addEventListener("click", closeSuccess);

// Écouteur pour le bouton de confirmation
closeSuccessSubmit.addEventListener("click", closeSuccess);
