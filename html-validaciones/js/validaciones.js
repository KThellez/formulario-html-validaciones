export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.validity.valid)
    console.log(tipoDeInput)
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input)
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};


const mensajeDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo email no puede estar vacio",
        typeMissmatch: "El correo no es valido",
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes ser mayor de edad (min 18 años)",
    },
    numero:{
        valueMissing: "El campo número no puede estar vacio",
        patternMismatch: "El formato requerido es de diez números XXXXXXXXXX",
    },
    direccion:{
        valueMissing: "Este campo  no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad:{
        valueMissing: "Este campo  no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 3 a 40 caracteres.",

    },
    departamento:{
        valueMissing: "Este campo  no puede estar vacio",
        patternMismatch: "El departamento debe contener entre 4 a 40 caracteres.",

    },
}

const tipoDeErrores = [
    "valueMissing",
    "typeMissmatch",
    "patternMismatch",
    "customError",
];


function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajeDeError[tipoDeInput][error]
            console.log(tipoDeErrores)
            console.log(error)
        }
    })
    return mensaje;
}


/*
const inputNacimiento = document.querySelector("#birth")

const nacimiento = (evento) => {
    validarNacimiento(evento.target)
}
inputNacimiento.addEventListener("blur", nacimiento)
*/
function validarNacimiento(input){
    const fechaCliente = new Date(input.value)
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de edad (min 18 años)"
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(

        fecha.getUTCFullYear()+18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return (diferenciaFechas <= fechaActual)    
}