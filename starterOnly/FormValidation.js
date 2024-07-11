function validate() {
  // Récupérer les éléments du formulaire
  const firstName = document.getElementById('first');
  const lastName = document.getElementById('last');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const quantity = document.getElementById('quantity');
  const locations = document.getElementsByName('location');
  const terms = document.getElementById('checkbox1');

  // Récupérer les éléments des messages d'erreur
  const firstError = document.getElementById('first-error');
  const lastError = document.getElementById('last-error');
  const emailError = document.getElementById('email-error');
  const birthdateError = document.getElementById('birthdate-error');
  const quantityError = document.getElementById('quantity-error');
  const locationError = document.getElementById('location-error');
  const termsError = document.getElementById('terms-error');

  // Réinitialiser les messages d'erreur
  firstError.textContent = '';
  lastError.textContent = '';
  emailError.textContent = '';
  birthdateError.textContent = '';
  quantityError.textContent = '';
  locationError.textContent = '';
  termsError.textContent = '';

// Réinitialiser les bordures des champs
  firstName.classList.remove('error');
  lastName.classList.remove('error');
  email.classList.remove('error');
  birthdate.classList.remove('error');
  quantity.classList.remove('error');

  let valid = true;

  // Vérifier le champ Prénom (minimum 2 caractères / n'est pas vide)
  if (firstName.value.trim().length < 2) {
    firstError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    firstName.classList.add('error');
    valid = false;
  }

  // Vérifier le champ Nom (minimum 2 caractères / n'est pas vide)
  if (lastName.value.trim().length < 2) {
    lastError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    firstName.classList.add('error');
    valid = false;
  }

  // Vérifier l'adresse électronique (doit être valide)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Veuillez entrer une adresse électronique valide.';
    firstName.classList.add('error');
    valid = false;
  }

  // Vérifier le champ de la date de naissance (n'est pas vide)
  if (birthdate.value.trim() === '') {
    birthdateError.textContent = 'Vous devez entrer votre date de naissance.';
    firstName.classList.add('error');
    valid = false;
  }

  // Vérifier le champ de la quantité (une valeur numérique est saisie)
  if (isNaN(quantity.value) || quantity.value.trim() === '') {
    quantityError.textContent = 'Veuillez entrer une valeur numérique pour le nombre de tournois.';
    firstName.classList.add('error');
    valid = false;
  }

  // Vérifier si un bouton radio est sélectionné
  let locationSelected = false;
  for (const location of locations) {
    if (location.checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    locationError.textContent = 'Vous devez choisir une option.';
    valid = false;
  }

  // Vérifier si les conditions générales sont cochées
  if (!terms.checked) {
    termsError.textContent = 'Vous devez vérifier que vous acceptez les termes et conditions.';
    valid = false;
  }

  // Retirer la classe 'error' des champs valides
  if (firstName.value.trim().length >= 2) {
    firstName.classList.remove('error');
  }
  if (lastName.value.trim().length >= 2) {
    lastName.classList.remove('error');
  }
  if (emailPattern.test(email.value)) {
    email.classList.remove('error');
  }
  if (birthdate.value.trim() !== '') {
    birthdate.classList.remove('error');
  }
  if (!isNaN(quantity.value) && quantity.value.trim() !== '') {
    quantity.classList.remove('error');
  }
  if (locationSelected) {
    for (const location of locations) {
      location.classList.remove('error');
    }
  }
  if (terms.checked) {
    terms.classList.remove('error');
  }

  return valid;
}
