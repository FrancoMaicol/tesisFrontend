import { InputStates, StringsTypes } from "@types";
export function validateInputState( state: InputStates, type?: StringsTypes ) : InputStates {
  let regex: RegExp;
  let isValid = true;
  let errorMessage = "";
  const value = state.value;
  
  if(!value || value === "" ) {
    isValid = false;
    errorMessage = "Este campo no puede ir vacío";
    return { ...state, helperText: "Este campo no puede ir vacío", mood: "error" }
  };

  switch (type) {
    case "email":
      regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      errorMessage = regex.test(value) ? "" : "Formato de correo inválido"
      break;
    case "text":
      regex = /^(.*)$/
      errorMessage = regex.test(value) ? "" : "Texo inválido"
      break;
    default:
      regex = /^.*$/;
      break;
  }

  isValid = regex.test(value);

  return isValid ? {...state} : { ...state, helperText: errorMessage, mood: "error" }

}