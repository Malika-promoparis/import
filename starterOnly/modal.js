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
//On récupère l'élément de la croix qui permet de fermé la modale
const modalClose = document.querySelector(".close");

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
    throw new Error("Le nom est trop court.");
  }
  if (prenom.length < 2) {
    throw new Error("Le prénom est trop court.");
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
    throw new Error("L'email n'est pas valide.");
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

  // On vérifie que la date est valide
  if (isNaN(dateNaissance.getTime())) {
    throw new Error("La date de naissance n'est pas valide.");
  }
  // On vérifie que la date n'est pas dans le futur
  if (dateNaissance > dateAujourdhui) {
    throw new Error("La date de naissance ne peut pas être dans le futur.");
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
    throw new Error("Vous devez être majeur pour vous inscrire.");
  }
  if (age > 120) {
    throw new Error("Vous devez être encore en vie pour vous inscrire.");
  }
}

/**
 * Cette fonction prend une quantité en paramètre et valide qu'elle est au bon format
 * ici : un nombre entier
 * @param {number} quantite
 * @throws {Error}
 */
function validerQuantiteDeTournois(quantite) {
  // On vérifie que la quantité n'est pas vide et est un nombre
  if (quantite === "" || isNaN(quantite)) {
    throw new Error("La quantité est vide ou n'est pas un nombre.");
  }
  // On vérifie que la quantité est un entier
  if (!Number.isInteger(parseFloat(quantite))) {
    throw new Error("La quantité n'est pas un entier.");
  }
  // On vérifie que la quantité est comprise entre 0 et 99 inclus
  if (quantite < 0 || quantite > 99) {
    throw new Error("La quantité doit être comprise entre 0 et 99.");
  }
}

function validate(event) {
  // On empêche le formulaire de s'envoyer
  event.preventDefault();
  try {
    // On récupère les valeurs des champs
    let baliseNom = document.getElementById("last");
    let nom = baliseNom.value;
    let baliseFirst = document.getElementById("first");
    let prenom = baliseFirst.value;
    // On appelle la fonction pour valider le nom et le prénom
    validerNomPrenom(nom, prenom);
    let baliseMail = document.getElementById("email");
    let email = baliseMail.value;
    // On appelle la fonction pour valider l'email
    validerEmail(email);
    let baliseDateNaissance = document.getElementById("birthdate");
    let dateNaissance = baliseDateNaissance.value;
    // On appelle la fonction pour valider la date de naissance
    validerDateNaissance(dateNaissance);
    let baliseQuantite = document.getElementById("quantity");
    let quantite = baliseQuantite.value;
    validerQuantiteDeTournois(quantite);
  } catch (Error) {
    // On affiche le message d'erreur
    console.log(Error.message);
    alert(Error.message);
  }
}
