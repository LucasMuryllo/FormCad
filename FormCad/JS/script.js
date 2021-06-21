class validator{

  constructor() {
    this.validations = [
    'data-min-length',
    'data-max-length',
    'data-only-letters',
    'data-email-validate',
    'data-require',
    'data-equal',
    'data-password-validate',
    ]
  }

  // inicia a validação de todos os campos
  
  validate(form) {
      //limpa todas as validações antigas

      let currentValidations = document.querySelectorAll('form .error-validation');

      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }

      // pegar todos os inputs
      let inputs = form.getElementsByTagName('input');
      // trasnformar HTMLCollection em Array
      let inputsArray = [...inputs];
      
      // loop nos inputs e validação de acordo com os atributos encontrados
        inputsArray.forEach(function(input, obj) {
          // fazer a validação de acordo com o atributo do input

          for(let i = 0; thisValidations.length > i; i++) {
            if (input.getAttribute(this.validations[i]) != null) {
                
              // limpa a string para saber o método

              let method = this.validations[i].replace("data", "").replace("-", "");

              // valor do input

              let value = input.getAttribute(this.validations[i]);

              // invoca o método
              this[method](input,value);
            }
          }
        }, this);


  }
  // método para validar se tem um minimo caracteres
  minlength(input, minValue) {
    let inputlength = input.value.length;
    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
    if (inputlength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para validar se passou do maximo de caracteres
  maxLength(input, maxValue) {
    let inputlength = input.value.length;
    let errorMessage = `O campo precisa ter menos que ${maxValeu} caracteres`;
    if (inputlength < maxValeu) {
      this,printMessage(input, errorMessage);
    }
  }

  // método para validar strings que só contem letras
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;;
    let inputValue = input.value;
    let errorMessage = `Este campo não aceita números nem caracteres especiais`;
    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }
  }
    // método para validar email
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
      let email = input.value;
      let errorMessage = `Insira um e-mail no padrão contato@contato.com`;
      if (!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
    }

    // verificar se um campo esta igual o outro
    equal(input, inputName) {
      let inputToCompare = document.getElementsByName(inputName)[0];
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    // metodo para exibir inputs que são necessários
    require(input) {
      let inputValue = input.value;
      if(inputValue === '') {
        let errorMessage = `Este campo é obrigatório`;
        this.printMessage(input, errorMessage);
      }
    }
    // Validando o campo de senha
    passwordValidate(input) {
      // explodir string em Array
      let charArr = input.value.split("");
      let uppercases = 0;
      let numbers = 0;

      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }

      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa de um caracteres maiúsculo e um número`;
        this.printMessage(input, errorMessage);
      }
    }
    // método para imprimir mensagens de erro
    printMessage(input, msg) {
      //checa os erros presentes nos inputs
      let errorsQty = input.parentNode.querySelector('.error-validation');

      //imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.queryselector('.error-validation').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
      }
    }

    //remove todas as validações para fazer a checagem de novo
    cleanValidations(validations) {
      validations.forEach(el.remove());
    }
}

let form  = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');
let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e){
  e.preventDefault();

  
  validator.validate(form);
});
