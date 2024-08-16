export * from "./sharing/lists.types";
export * from "./fetching.types";
export * from "./icons.types"

//cotizaciones
export *  as NuevaCotizacionTypes from "./nueva_cotizacion/index";
export *  as CotizacionesTypes from "./cotizaciones/index";
export *  as DetalleCotizacionTypes from "./detalles_cotizacion/index";

//laucher
export *  as LauncherTypes from "./sharing/launcher.types";

//context
export *  as ContextTypes from "./sharing/contexts.types";

//emisiones
export *  as EmisionesTypes from "./emisiones/emisiones.types";
export *  as DetalleEmisionTypes from "./detalleEmision.types";

//suscripciones 
export * as SuscripcionesServices from "./suscripciones/services.types"
export * as DetalleSuscripcionTypes from "./suscripciones/detalle.types";

//sharing
export *  as FormFactoryTypes from "./sharing/formFactory.types";

export type SelectElements = Array<SelectOptions>;

export type ToggleOptions = { 
  value: string, 
  status: boolean 
};


export type SelectOptions = {
  id: number;
  descripcion: string;
}

export type SelectMoods = "error" | "filled" | "default" | "active" | "disabled" | "required"
export type SelectStates = { 
  value: string, 
  mood: SelectMoods, 
  helperText: string
}

export type SelectStatesNumber = { 
  value: number, 
  mood: SelectMoods, 
  helperText: string
}

export type InputMoods = "error" | "filled" | "default" | "active" | "disabled" | "required";
export type InputStates = { 
  value: string, 
  mood: InputMoods, 
  helperText: string
};

export type homeCardTypes =  "accidents" | "life" | "damages" | "cars";

export type NuevoDependienteForm = {
  nombreCompleto: InputStates;
  edad: InputStates;
  genero: SelectStates;
  parentesco: SelectStates;
}

export type buttonsTypes = 
    "principal_button" |
    "accidentes_card_button" |
    "vida_card_button" |
    "proximamente_card_button" 
  
export type ButtonsTypes = 
  "principal" | 
  "secondary" | 
  "tertiary" |
  "general" | 
  "general_white" | 
  "authentication" |
  "vida"

export type generalIcons = 
    "info" |
    "close" |
    "arrow_down" |
    "arrow_up" |
    "arrow_right" |
    "arrow_left" |
    "settings" |
    "delete" |
    "done" |
    "done_cirlce" |
    "plus" |
    "profile" |
    "phone" |
    "save" |
    "alert" |
    "enter" |
    "arrow_2_right" |
    "menu" |
    "menu_selected" |
    "edit" |
    "share" |
    "checkbox" |
    "checkbox_selected" |
    "download" |
    "external_link" |
    "home" |
    "less" |
    "location" |
    "circle_check" |
    "circle_check_filled" |
    "logout" |
    "eye" |
    "eye_selected" |
    "event" |
    "search" |
    "admin" |
    "accident" |
    "life" |
    "cars" |
    "damages"


