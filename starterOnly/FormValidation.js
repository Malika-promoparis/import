document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.querySelector('form[name="reserve"]');
  form.addEventListener('submit', validate);
});

function resetFormErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  const inputElements = document.querySelectorAll('.error');

  errorElements.forEach((element) => {
    element.textContent = '';  // Effacer le message d'erreur
  });

  inputElements.forEach((element) => {
    element.classList.remove('error');  // Retirer la classe d'erreur
  });
}

function validateFirstName() {
  const firstName = document.getElementById('first');
  const firstError = document.getElementById('first-error')
  if (firstName.value.trim().length < 2) {
    firstError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    firstName.classList.add('error');
    return false
  }
  return true
}

function validateLastName() {
  const lastName = document.getElementById('last');
  const lastError = document.getElementById('last-error')
  if (lastName.value.trim().length < 2) {
    lastError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    lastName.classList.add('error');
    return false
  }
  return true
}

function validate(event) {
  event.preventDefault();  // Empêcher la soumission du formulaire

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
  /*if (firstName.value.trim().length < 2) {
    firstError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    firstName.classList.add('error');
    valid = false;
  }*/
 valid=validateFirstName() && validateLastName()

  // Vérifier le champ Nom (minimum 2 caractères / n'est pas vide)
  /*if (lastName.value.trim().length < 2) {
    lastError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    lastName.classList.add('error');
    valid = false;
  }*/


  // Vérifier le champ Email (format email)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = 'Veuillez entrer une adresse email valide.';
    email.classList.add('error');
    valid = false;
  }

  // Vérifier le champ Date de naissance (n'est pas vide)
  if (!birthdate.value.trim()) {
    birthdateError.textContent = 'Vous devez entrer votre date de naissance.';
    birthdate.classList.add('error');
    valid = false;
  }

  // Vérifier le champ Quantité (n'est pas vide et est un nombre positif)
  if (!quantity.value.trim() || quantity.value < 0) {
    quantityError.textContent = 'Veuillez entrer un nombre valide.';
    quantity.classList.add('error');
    valid = false;
  }

  // Vérifier le champ Location (au moins un bouton radio sélectionné)
  let locationSelected = false;
  for (let location of locations) {
    if (location.checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    locationError.textContent = 'Vous devez choisir une option.';
    valid = false;
  }

  // Vérifier les conditions générales (checkbox1 doit être coché)
  if (!terms.checked) {
    termsError.textContent = 'Vous devez vérifier que vous acceptez les termes et conditions.';
    valid = false;
  }

  if (valid) {
    if (valid) {
      // Masquer le formulaire et afficher le message de confirmation
      const confirmationMessage = document.getElementById('confirmation-message');
      const form = event.target;
      form.style.display = 'none';
      confirmationMessage.style.display = 'flex';
    
      // Réinitialiser le formulaire après une soumission valide
      form.reset();
  }

  return valid;
}
}

// Fermer la modale sans réinitialiser le formulaire
function closeModal() {
  // Cacher la modale
  document.querySelector('.bground').style.display = 'none';

  // Réinitialiser l'affichage du formulaire et du message de confirmation
  document.getElementById('confirmation-message').style.display = 'none';
  const form = document.querySelector('form[name="reserve"]');
  form.style.display = 'block'; // Assurez-vous que le formulaire est affiché
}

// Assigner la fonction de fermeture à la croix de la modale
document.querySelector('.close').addEventListener('click', closeModal);
document.querySelector('.closeMessage').addEventListener('click', closeModal);