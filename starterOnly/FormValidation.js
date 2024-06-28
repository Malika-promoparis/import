function validate() {
    // Récupérer les éléments du formulaire
    const firstName = document.getElementById('first');
    const lastName = document.getElementById('last');
    const email = document.getElementById('email');
    const quantity = document.getElementById('quantity');
    const locations = document.getElementsByName('location');
    const terms = document.getElementById('checkbox1');
  
    let valid = true;
  
    // Vérifier le champ Prénom (minimum 2 caractères / n'est pas vide)
    if (firstName.value.trim().length < 2) {
      valid = false;
    }
  
    // Vérifier le champ Nom (minimum 2 caractères / n'est pas vide)
    if (lastName.value.trim().length < 2) {
      valid = false;
    }
  
    // Vérifier l'adresse électronique (doit être valide)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      valid = false;
    }
    
    // Vérifier le champ de la quantité (une valeur numérique est saisie)
    if (isNaN(quantity.value) || quantity.value.trim() === '') {
      valid = false;
    }
  
    // Vérifier si un bouton radio est sélectionné
    let locationSelected = false;
    for (const location of locations) {
      if (location.checked) {
        locationSelected = true;
        break;
    }
    if (!locationSelected) {
      valid = false;
    }
  
    // Vérifier si les conditions générales sont cochées
    if (!terms.checked) {
      valid = false;
    }
  
    return valid;
  }
}