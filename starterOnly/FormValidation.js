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

  let valid = true;

  // Vérifier le champ Prénom (minimum 2 caractères / n'est pas vide)
  if (firstName.value.trim().length < 2) {
    firstError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    valid = false;
  }

  // Vérifier le champ Nom (minimum 2 caractères / n'est pas vide)
  if (lastName.value.trim().length < 2) {
    lastError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    valid = false;
  }

  // Vérifier l'adresse électronique (doit être valide)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Veuillez entrer une adresse électronique valide.';
    valid = false;
  }

  // Vérifier le champ de la date de naissance (n'est pas vide)
  if (birthdate.value.trim() === '') {
    birthdateError.textContent = 'Vous devez entrer votre date de naissance.';
    valid = false;
  }

  // Vérifier le champ de la quantité (une valeur numérique est saisie)
  if (isNaN(quantity.value) || quantity.value.trim() === '') {
    quantityError.textContent = 'Veuillez entrer une valeur numérique pour le nombre de tournois.';
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

  return valid;
}
