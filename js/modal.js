/**
 * Get HTMLElement with selector and return lot of utils to manipulate DOM.
 * returning the context allows us to chain the method.
 * @param {string} selector 
 * @return {$} this
 * @example
 *  $(".class").text('Hello World !').style("color: red");
 */
const $ = function (selector) {
  /**
   * Selecte element with selector
   *  @type {HTMLELement}
   */
  let elm = document.querySelector(selector);
  return {
    /**
     * Add text into selected element
     * @param {string} text
     * @return {$}
     * @example $(selector).text("Write some text")
     */
    text(text){
      elm.innerText = text
      return this;
    },
    /**
     * Add Html into selected element
     * @param {string} template
     * @return {$}
     * @example 
     * $(selector).html('<p>Hello world!</p>');
     * $(selector).html(`
     * <section class="element">
     *   <h2>Title</h2>
     *   <p>Some Text !</p>
     * </section>
     * `);
     */
    html(template){
      elm.innerHTML = template;
      return this;
    },
    /**
     * Add some style into selected element
     * @param {string} style
     * @return {$}
     * @example $(selector).style("display: none"); 
     */
    style(style) {
      elm.style = style
      return this;
    },
    /**
     * Add some class into selected element
     * @param {string} className
     * @return {$}
     * @example $(selector).addClass("container"); 
     */
    addClass(className) {
      elm.className += ` ${className}`
      return this;
    },
    /**
     * Remove some class into selected element
     * @param {string} className
     * @return {$}
     * @example $(selector).removeClass("container"); 
     */
    removeClass(className) {
      elm.className -= className
      return this;
    },
    /**
     * Append new HTMLElement into selected element
     * @param {string} element
     * @return {$}
     * @example $(selector).append(newElement); 
     */
    append(element) {
      elm.append(element);
      return this;
    },
    /**
     * Prepend new HTMLElement into selected element
     * @param {string} element
     * @return {$}
     * @example $(selector).prepend(newElement); 
     */
    prepend(element) {
      elm.prepend(element);
      return this;
    },
    /**
     * Add event click into selected element
     * @param {string} element
     * @return {$}
     * @example $(selector).click(() => alert('Clicked!')); 
     */
    click(cb) {
      elm.addEventListener("click",cb);
      return this;
    },
    /**
     * Add event submit into form selected
     * @param {string} element
     * @return {$}
     * @example $(selector).submit(() => alert('Submited!')); 
     */
    submit(cb) {
      elm.addEventListener("submit", cb);
      return this;
    },
    /**
     * Create and add new HTMLElement into selected element,
     * Add new class if you specified
     * @param {string} element
     * @return {$}
     * @example 
     * $(selector).add("p"); 
     * $(selector).add("div.class"); 
     */
    add(element) {
      let splitTagAndClassElement = element.split('.');
      let newElm = createElement(splitTagAndClassElement[0]);
      if (splitTagAndClassElement.length > 0) {
        for (let i = 1; i < splitTagAndClassElement.length; i++) {
          newElm.className += ` ${splitTagAndClassElement[i]}`;
        }
      }
      elm.append(newElm);
      return this;
    },
    /**
     * Remove selected element
     * @return {$} 
     */
    remove() {
      elm.remove();
      return this;
    },
    /**
     * Get parent element
     * @return {Node & ParentNode} 
     */
    parent() {
      return elm.parentNode;
    },
    /**
     * Returns the current element
     * @return {Element} 
     */
    getElm() {
      return elm;
    },
    /**
     * Check if the input checkbox is checked
     * @return {bool} 
     */
    checked() {
      return elm.checked;
    }

  }
}
const createElement = (elm) => document.createElement(elm);

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = $(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  if ($('.success-message').getElm() !== null) {
    $('.success-message').remove();
    $('.content .modal-body').style('display:block');
  }
  modalbg.style("display: block;");
}

/**
 * Trigger Event click on .close element.
 * Run closeModal.
 */
 $('.content > .close').click(closeModal);

 /**
  * Close Modal
  */
 function closeModal() {
   modalbg.style("display: none;");
 }
 

/**
 * Trigger event submit for form.
 * Run formValidation.
 */
$(".modal-body > form").submit(formValidation);


/**
 * Contain all validator rules for each input.
 * @type {{ [key:string]: (value:string) => boolean }}
 */
 const validator = {
  "first": (value) => rules(value, "REQUIRED") && rules(value, "STRING") && rules(value, "MIN", 2),
  "last": (value) => rules(value, "REQUIRED") && rules(value, "STRING") && rules(value, "MIN", 2),
  "email": (value) =>  rules(value, "REQUIRED") && rules(value, "STRING") && rules(value, "EMAIL"),
  "birthdate": (value) => rules(value, "REQUIRED"),
  "quantity": (value) => rules(value, "REQUIRED") && rules(value, "MIN", 0),
  "location": (value) => rules(value, "REQUIRED")
 };

/** 
 * Contain all error messages.
 * @type {{ [key: string]: string }}
 */
 const errorMessages = {
  "first": "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  "last": "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  "email": "Veuillez entrer un e-mail valide.",
  "location": "Vous devez choisir une option.",
  "birthdate": "Vous devez entrer votre date de naissance.",
  "quantity": "Veuillez préciser le nombre de tournois.",
  "cgu": "Vous devez vérifier que vous acceptez les termes et conditions."
};

/**
 * Get data in form.
 * @param { FormElement } form
 * @return { FormData } return all entries in form
 */
const getFormData = (form) => new FormData(form);

/**
 * Run form validator
 * check if the data entered is correct and launch formValidated().
 * If the data is incorrect it launch displayError().
 * @param { Event } event
 * @return {void} void
 */
function formValidation(event) {
  event.preventDefault();
  
  const data = getFormData(event.target);
  const errors = [];
  
  if (document.querySelectorAll(".error")) errorReset();

  data.forEach((value, name) => {
    if (!validator[name](value)) {
      errors.push({
        name,
        message: errorMessages[name]
      });
    }
  });
  if (!data.has("location")) {
    errors.push({
      name: "location",
      message: errorMessages["location"]
    });
  }
  if (!$("#checkbox1").checked) {
    errors.push({
      name: "checkbox1",
      message: errorMessages["cgu"]
    });
  }
  if (errors.length) {
    displayError(errors);
    return;
  }

  formValidated();
}
/**
 * Deifined rules for form validator
 * @param {string | number } value Enter value
 * @param {"REQUIRED | STRING | NUMBER | MIN | MAX | EMAIL"} flag Choosed rules for validations
 * @param {string | number } compareValue Value to be compare with enter value
 * @return boolean 
 * @example 
 *    rules("text", "REQUIRED");
 *    rules("text", "MIN", 8);
 *    rules("text", "MAX", 12);
 */
const rules = (value, flag, compareValue) => {
  switch (flag) {
    case "REQUIRED": {
      return value.trim().length > 0;
    }
    case "STRING": {
      return typeof value === "string";
    }
    case "NUMBER": {
      return typeof value === "number";
    }
    case "MIN": {
      return value.length > compareValue;
    }
    case "MAX": {
      return value.length < compareValue;
    }
    case "EMAIL": {
      return new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
    }
    default:
      break;
  }
}

/**
 * Display validation message, hide .modal-body 
 * and reset all input in form.
 * @return {void} void
 */
function formValidated() {
  $('.content .modal-body').style('display:none');
  $('.content').add('div.success-message.hello-world');

  $('.success-message').style('text-align: center; margin: 15px').html(`
    <p>
      Merci ! Votre réservation a été reçue.
    </p>
    <button class="btn-submit" onclick="closeModal();">Fermer</button>
  `);
  resetInput();
}

/**
 * Display error
 * @param {{ name: string, message: string }} data
 * @return {void} void
 */
const displayError = (data) => data.forEach(({ name, message }) => errorMessage(name, message));

/**
 * Create elements for error message and display at top of input
 * @param {string} name
 * @param {string} message
 * @return {void} void
 */
function errorMessage(name, message) {
  const field = $(`input[name="${name}"]`).getElm() === null ? $(`#${name}`) : $(`input[name="${name}"]`);
  field.style("border-color: red; border-width: 4px;");
  
  const wrapper = createElement('div');
  wrapper.className = "error";
  
  const errorElm = createElement('span');
  errorElm.innerHTML = message;
  errorElm.style = "color: red; font-size: 12px";

  wrapper.append(errorElm);
  
  field.parent().prepend(wrapper);
}

/**
 * Delete all error message and reset input style.
 * @return {void} void
 */
function errorReset() {
  document.querySelectorAll('.error').forEach(elm => elm.remove());
  document.querySelectorAll('input').forEach(input => input.style = "");
}

/**
 * Reset all input value to void.
 * @return {void} void
 */
function resetInput() {
  document.querySelectorAll('.formData > input').forEach(input => {
    input.value = "";
    if(input.checked) input.checked = false;
  });
}
