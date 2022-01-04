// function editNav() {
//   let x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += "responsive";
//   } else {
//     x.className = "topnav";
//   }
// }


// DOM Elements
const modalbg = document.getElementById("bground");
const closeModalBtn = document.querySelector(".closeModal");
const modalBtn = document.querySelector(".modal-btn");
const formData = document.querySelectorAll(".formData");
const toggleMenu = document.querySelectorAll(".toggleMenu");
const modalThanks = document.getElementById("thanks");


/*TOGGLE MENU*/
toggleMenu.forEach((el) => el.addEventListener("click", (e) => {
  document.body.classList.toggle('menu-open');
}
));


/*OUVERTURE MODAL*/
// launch modal event
modalBtn.addEventListener("click", launchModal);

// launch modal form
function launchModal(){
  modalbg.style.display = "block";
  window.scrollTo(0, 0);
  modalbg.scrollTo(0,0);
  document.body.style.overflow = "hidden";
}

/*FERMETURE MODAL*/

//close modal event
closeModalBtn.addEventListener("click", closeModal);

//close modal form
function closeModal(){
  modalbg.style.display = "none";
  closeModalBtn.removeEventListener("click", closeModal);
}

//variable formulaire
let form = document.forms["reserve"];

//format text et mail
let verifMail = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
let textFormat = /^[a-zA-Z\é\è\-\^\']{2,30}$/;

form.addEventListener("submit", function(e){
  e.preventDefault();
  //constantes
  const first = form.querySelector('input[name="first"]');
  const last = form.querySelector('input[name="last"]');
  const email = form.querySelector('input[name="email"]');
  const birthdate = form.querySelector('input[name="birthdate"]');
  const quantity = form.querySelector('input[name="quantity"]');

  const error = document.getElementById("error");
  const error1 = document.getElementById("error1");
  const error2 = document.getElementById("error2");
  const error3 = document.getElementById("error3");

  let formErrors = 0;

  //label prenom
  if(first.value == "" || textFormat.test(first.value) == false){
    error.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom';
    error.style.color = "red";
    error.style.fontSize = '0.75rem';
  }else{
    error.innerHTML = "";
    formErrors++;
  }

  //label nom
  if(last.value == "" || textFormat.test(last.value) == false){
    error1.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    error1.style.color = "red";
    error.style.fontSize = '0.75rem';;
  }else{
    error1.innerHTML = "";
    formErrors++;
  }

  //label mail
  if(!email.value.trim().match(verifMail)){
    alert("l'adresse email n'est pas valide");
    e.removeEventListener();
  }

  //label birthday
  if(birthdate.value == ""){
    error2.textContent = 'Vous devez entrer votre date de naissance.';
    error2.style.color = "red";
    error.style.fontSize = '0.75rem';
  }else{
    error2.innerHTML = "";
    formErrors++;
  }

  //tournoi quantity
  if(quantity.value == ""){
    error3.textContent = 'Vous devez saisir un nombre.';
    error3.style.color = "red";
    error3.style.fontSize = '0.75rem';
  }else{
    error3.innerHTML = "";
    formErrors++;
  }

  //location
  errorMessage.innerHTML = "";
  if(
    document.getElementById("location1").checked ||
    document.getElementById("location2").checked ||
    document.getElementById("location3").checked ||
    document.getElementById("location4").checked ||
    document.getElementById("location5").checked ||
    document.getElementById("location6").checked
  ){
    formErrors++;
  }else{
    errorMessage.textContent = "Vous devez choisir une option.";
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "0.75rem";
  }

  if(!terms.checked){
    errorTerms.textContent =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    errorTerms.style.color = "red";
    errorTerms.style.fontSize = "0.75rem";
  }else{
    errorTerms.innerHTML = "";
    formErrors++;
  }

  if (formErrors > 0){
    console.log('azeaze')
    return false
  }else{
    form.reset();
    showModalThanks()
  }



    // console.log(formErrors);
    // if(formErrors === 7) {
      //   reserve.innerHTML = "Votre reservation <br> a bien été reçue";
      //   btnClose.style.display = "block";
      //   reserve.style = "display: flex;  justify-content: center; align-item : center";
      //   document.getElementById("reserve").reset();
      //   closeDelay();
      // }
      
      // function closeDelay(){
        //   window.setTimeout(reloadPage, 5000);
        // }
        
        // function reloadPage(){
          //   location.reload();
          // }
        });
        
        function showModalThanks(){
          formulaire.style.display= 'none';
          modalThanks.style.display = '';
        }
        
        
        function showModalForm(){
        modalThanks.style.display = 'none';
        formulaire.style.display = '';
        }
/*
const getUsers = async function () {
  let data = await fetch()
  .then(response => response.json())
  console.log(data)
}

getUsers()

let email = document.querySelector('#email')
email.focus()

document.querySelector('form').addEventListener('submit', function(e){
    let mentions = document.querySelector('#mentions')
    if(!mentions.checked) {
        alert('Vous n\'avez pas accepté les CGU')
        e.preventDefault()
    }
})*/
