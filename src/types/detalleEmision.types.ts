import { InputStates, SelectStates, SelectOptions } from "@types";

///// CONTEXT //////////////

//--- types relationed with reducer method
export type DispatchPayloads = 
    number | string | // to set step, and set numero dependientes
    GeneralDataFormSates | // to set general data of asegurado step 
    DireccionFormStates |  //to set data of direccion form of asefurado step 
    EmployDataFormStates | //tp set data form employ of asegurado step
    ContextState |
    TipoPersona | // to set tipo of people
    boolean | // to set isASegurado
    FormStatesGeneralDataPersonaMoral | //tp set moral form of general data
    FormStatesDireccionPersonaMoral | //to ser moral form of direccion data
    SetDependientesFormsStates | //para setear los valores de los formularios de dependientes
    SetDependientesFormsStatesAndNumeroDependientes |//para setear forms and numero dependientes al mismo tiempo 
    Array<CuestionariosType> | // para seterar los cuestionarios de dependientes 
    CuestionariosType | // para setear los cuestionarios del asegurado 
    FormaPago | //para setear formas de pago 

    //paso 6. detalles plan 
    DetallesPlanForm | //para setear form de detalles de plan
    DetallePlanPicture | //para setear la picture del form ese
    DetallePlanResults //para seteear resultados 
    
export type DispatchEvents = 
    "setStep" | 
    "setGeneralDataFormState" |
    "setDireccionFormState" | 
    "setEmpleoFormState" |
    "setInitialState" |
    "setPersonType" |
    "setIsAsegurado" |
    "setGeneralDataFormStateMoral" |
    "setGeneralDataFormStateFisica" |
    "setDireccionFormStateContratante" |
    "setDireccionFormStateContratanteMoral" |

    /*** STEP 3 DEPENDIENTES ***/
    "setAgregarDependientes" |
    "setNumeroDependientes" |
    "setDependientesForms" |
    "setDependientesFormsAndNumeroDependientes" |
    "setCuestionariosDependientes" |

    /**** STEP 4 CUESTIONARIOS ***/
    "setCuestionarios" |

    /**** STEP 5 FORMA PAGO ***/
    "setFormaPagoData" | 

    /** STEP 6 DETALLES DE PLAN  */
    "setDetallesPlanForm" |
    "setDetallesPlanPicture" |
    "setDetallesPlanResults"


//---- types relationed with context state
export type ContextState = {
    idEmision?: string, 
    step: number,
    steps: ContextSteps,
};
export type ContextSteps = {
    asegurado: {
        datosGeneralesFormStates: GeneralDataFormSates,
        direcionFormStates: DireccionFormStates,
        datosEmpleoFormStates: EmployDataFormStates,
    }, 
    contratante: {
        tipoPersona: TipoPersona,
        isAsegurado: boolean,
        datosGeneralesFormStatesFisica: GeneralDataFormSates,
        direccionFormStatesFisica: DireccionFormStates,
        datosGeneralesFormStatesMoral: FormStatesGeneralDataPersonaMoral,
        direccionFormStatesMoral: FormStatesDireccionPersonaMoral,
    },
    dependientes: {
        isAgregarDependientes: boolean,
        numeroDependientes: number,
        formsStatesDatosGenerales?: Array<FormsStatesDatosGeneralesDependientes>,
        formsStatesDireccion?: Array<DireccionFormStates>,
        cuestionarios?: Array<CuestionariosType>,
    },
    cuestionarios?: CuestionariosType,
    formaPago: FormaPago, 
    detallesPlan: {
        form: DetallesPlanForm,
        picture?: DetallePlanPicture,
        results: DetallePlanResults,
    }
};


export type DetallePlanResults = {
    gastosExpedicion: number, 
    pagoFraccionado: number, 
    subtotal: number, 
    total: number, 
}
export type DetallePlanPicture = {
    [idCobertura: number] : {
        //selectValue?: string, //solo en adicionales y no amparadas
        checkboxState: boolean,
        coberturaData: {
            type: "Base" | "Adicional",
            descripcion: string,
            sumaAsegurada: number, 
            prima: number, 
            editaSA: boolean, 
            sumasAseguradasList?: Array<{id: number, descripcion: number}>,
        }
    }
}
export type DetallesPlanForm = {
    tipoPlan: SelectStates,
    moneda: SelectStates,
    dependientesTotales: SelectStates,
    sumaAsegurada: SelectStates,
    porcentajeHM: SelectStates,
    coaseguro: SelectStates,
    porcentajeHQ: SelectStates,
    deducible: SelectStates,
    formaPago: SelectStates,
};
export type FormaPago = {
    tipo?: FormasPago, 
    data: FormasPagoData, 
}

export type FormasPagoData = {
    referenciaBancaria: InputStates, 
    banco: SelectStates,
    convenio: InputStates,  
    tipoTarjeta?: TiposTarjetas,
    numeroTarjeta: InputStates, 
    emisorTarjeta?: TiposEmisores,
    empresa: SelectStates, 
    frecuenciaDXN: SelectStates
}

export type TiposTarjetas = "debito" | "credito" | "amex";
export type TiposEmisores = "visa" | "mastercard";
export type FormasPago = "efectivo" | "transferencia" | "tarjeta" | "nomina";


export type CuestionariosMoods = "filled" | "available" | "disabled"

export type CuestionariosType = {
    cuestionarioActual: number,
    medico: {
        mood: CuestionariosMoods,
        data: CuestionarioMedicoForm,
    },
    deportes: {
        mood: CuestionariosMoods,
        data: CuestionarioDeportes,
    },
    infoAdicional: {
        mood: CuestionariosMoods, 
        data: CuestionarioInfoAdicional
    }
}

export type CuestionarioInfoAdicional = {
    viajeExtranjero: TogglesStatus,
    enfermedadesCronicas: TogglesStatus,
    tamanioOrganos: TogglesStatus,
    transfusionesSangre: TogglesStatus,
    consumoDrogas: TogglesStatus,
    fumar: TogglesStatus,
    bebidasAlcoholicas: TogglesStatus,
    rechazado: TogglesStatus,
    otrasPolizas: TogglesStatus,
}

export type TogglesStatus = { value: string, status: boolean };

export type CuestionarioDeportes = {
    deportesPeligrosos: DeportesPeligrososStatus, 
    form: {
        deportesPracticas: InputStates, 
        modalidad: SelectStates, 
        frecuencia: SelectStates,
    },
}

export type DeportesPeligrososStatus = {
    [clave: number]: { value: string, state: boolean };
}

export type ToggleData = {
    status: boolean, 
    value: string, 
}
export type CuestionarioMedicoForm = {
    form: {
        peso: InputStates, 
        estatura: InputStates, 
        fechaUltimaConsulta: InputStates, 
        esAtencion2Anios: SelectStates,
        esIntervencionQuirugica: SelectStates,
        esBajoTratamientoMedico: SelectStates,
        esEmbarazada: SelectStates,
        tiempoEmbarazo: SelectStates,
    },
    enfermedades: EnfermedadesStatus,
    toogle: {
        sida: ToggleData, 
        otros: ToggleData,
    },
   
}


export type EnfermedadesStatus = {
    [clave: number]: { value: string, state: boolean };
}

export type SetDependientesFormsStatesAndNumeroDependientes = {
    formsStatesDatosGenerales?: Array<FormsStatesDatosGeneralesDependientes>,
    formsStatesDireccion?: Array<DireccionFormStates>,
    numeroDependientes: number,
}

export type SetDependientesFormsStates = {
    formsStatesDatosGenerales?: Array<FormsStatesDatosGeneralesDependientes>,
    formsStatesDireccion?: Array<DireccionFormStates>
}

export type FormsStatesDatosGeneralesDependientes = {
    nombreCompleto: InputStates,
    parentesco: SelectStates,
    genero: SelectStates, 
    estadoCivil: SelectStates,
    fechaNacimiento: InputStates,
    edad: InputStates,
}
export type FormStatesDireccionPersonaMoral = {
    codigoPostal: InputStates, 
    estado: InputStates, 
    municipio: InputStates, 
    colonia: SelectStates, 
    calle: InputStates, 
    numExt: InputStates, 
    numInt: InputStates, 
    referencias: InputStates,
}
export type FormStatesGeneralDataPersonaMoral = {
    razonSocial: InputStates,
    fechaConstitucion: InputStates, 
    actividad: SelectStates,
    telefonoFijo: InputStates,
    telefonoCelular: InputStates,
    correoElectronico: InputStates,
    rfc: InputStates,
    representanteLegal: InputStates,
}
export type TipoPersona = "fisica" | "moral"
export type GeneralDataFormSates = {
    apellidoPaterno: InputStates,
    apellidoMaterno: InputStates, 
    nombres: InputStates,
    edad: InputStates,
    inicioVigencia: InputStates,
    rfc: InputStates,
    curp: InputStates, 
    fechaNacimiento: InputStates, 
    genero: SelectStates, 
    estadoCivil: SelectStates,
};
export type DireccionFormStates = {
    codigoPostal: InputStates, 
    estado: InputStates, 
    municipio: InputStates, 
    colonia: SelectStates, 
    calle: InputStates, 
    numExt: InputStates, 
    numInt: InputStates, 
    telefonoCelular: InputStates, 
    telefonoFijo: InputStates, 
    correoElectronico: InputStates,
};
export type EmployDataFormStates = {
    profesion: SelectStates,
    nombreLugarTrabajo: InputStates, 
    lugarTrabajo: SelectStates,
    antiguedad: InputStates,
    giroNegocio: SelectStates,
    ingresosMensuales: InputStates,
    telefonoContacto: InputStates, 
    descripcionLabores: InputStates,
};


///////// SERVICES ///////////
// --- Service: getAllSelectsData --- //
  // payload to receive from endpoint
export type GetAllSelectsData = {
    generos: Array<SelectOptions>,
    estadosCiviles: Array<SelectOptions>,
    ocupaciones: Array<SelectOptions>,
    lugarTrabajo: Array<SelectOptions>,
    girosNegocio: Array<SelectOptions>,
    actividades: Array<SelectOptions>,
    parentescos: Array<SelectOptions>,
}

// --- Service: getAseguradoData --- // 
  // data to send 
export type GetAseguradoDataIN = {
    idEmision: string,
}
  // payload to receive from endpoint
export type GetAseguradoDataPayload= {
    datosGenerales: {
        apellidoPaterno: string,
        apellidoMaterno: string,
        nombres: string,
        edad: number,
        fechaNacimiento: string,
        genero: string,
    },
}

// --- Service: getDataByZipCode --- // 
  // data to send 
  export type GetDataByZipCodeIN = {
    codigoPostal: string,
}
  // payload to receive from endpoint
export type GetDataByZipCodePayload= {
    estado: string,
    municipio: string,
    colonias: Array<SelectOptions>,
}


// --- Service: getDataByZipCode --- // 
  // data to send 
  export type SendAseguradoDataIN = {
    idEmision: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    fechaNacimiento: string,
    genero: string,
    estadoCivil: string,
    curp: string,
    rfc: string,
    edad: string,
    codigoPostal: string,
    estado: string,
    municipio: string,
    colonia: string,
    calle: string,
    numExt: string,
    numInt: string | undefined,
    telefonoCelular: string,
    telefonoFijo: string | undefined,
    correoElectronico: string,
    ocupacion: string,
    nombreLugarTrabajo: string,
    lugarTrabajo: string,
    antiguedad: string,
    giroNegocio: string,
    ingresosMensuales: string,
    telefonoContacto: string,
    descripcionLabores: string
}
  // payload to receive from endpoint
export type SendAseguradoDataPayload= {
    idEmision: string,
}


/// ::::::::::: STEP ::::::::::: 3 dependientes ----- ///
    
    // --- Service: getDependientes --- // 
  // data to send 
export type GetDependientesIN = {
    idEmision: string,
}
  // payload to receive from endpoint
export type GetDependientesPayload= {
    totalDependientes: number,
    datosGenerales: Array<{
        edad: string, 
        genero: string, 
        id: number, 
        nombreCompleto: string, 
        parentesco: string,
    }>
}

    // --- Service: sendDependientesData --- // 
  // data to send 
export type SendDependientesDataIN = {
    idEmision: string,
    listaDependientes: Array<{
      datosGenerales: {
        nombreCompleto: string,
        fechaNacimiento: string,
        edad: string,
        genero: string,
        parentesco: string
      },
      direccion: {
        codigoPostal: string,
        estado: string,
        municipio: string,
        colonia: string,
        calle: string,
        numExt: string,
        numInt: string,
        telefonoCelular: string,
        telefonoFijo: string,
        correoElectronico: string
      }
    }>
}
  // payload to receive from endpoint
export type SendDependientesDataPayload = {
    idEmision: string,
}

    // --- Service: sendDependientesCuestionarios --- // 
  // data to send 
export type SendDependientesCuestionariosIN = {
    idEmision: string,
    tipoAsegurado: "Titular" | "Dependiente",
    listaCuestionarios: Array<{
        medico:{
            peso: number,
            estatura: number,
            fechaUltConsulta: string,
            atencionMedica: string,
            operaciones: string,
            tratamientoMedico: string,
            padecimientos: Array<number>,
            embarazo: string,
            tiempoEmbarazo: string,
            descripcionPruebaVIH: string | undefined,
            enfermedadesNoListadas: string | undefined,
        },
        actividades:{
            deportes:Array<number>,
            deportesNoListados: string,
            modalidadDeporte: string,
            frecuenciadeporte: string
        },
        adicional:{
            viajeAlExtranjero: string,
            enfermadesCronicas: string,
            aumento: string,
            transfusiones: string,
            consumoDeDrogas: string,
            fumar:string,
            beberAlcohol: string,
            historialSeguros: string,
            polizasActivas: string
        }
    }>
}
  // payload to receive from endpoint
export type SendDependientesCuestionariosPayload = {
    idEmision: string,
}

/// ::::::::::: STEP ::::::::::: 4 cuestionarios ----- ///
// --- Service: getDependientes --- // 
  // data to send 
  // payload to receive from endpoint
export type GetItemsSurveysPayload= {
    enfermedades: Array<SelectOptions>,
    deportes: Array<SelectOptions>,
    modalidadDeporte: Array<SelectOptions>,
    frecuenciaDeporte: Array<SelectOptions>,
}


/// ::::::::::: STEP ::::::::::: 5 formaPago ----- ///
// --- Service: getDependientes --- // 
  // data to send 
  // payload to receive from endpoint
  export type GetBancosPayload= {
    bancos: Array<SelectOptions>,
}

/// ::::::::::: STEP ::::::::::: 6 detallePlan ----- ///
// --- Service: getCatalogsByProduct --- // 
  // data to send 
export type GetCatalogsByProductIN = {
    idRamo: number, 
    idProducto: number, 
}
  // payload to receive from endpoint
export type GetCatalogsByProductPayload = {
    coaseguro: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    deducible: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    dependientes: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    formaPago: {
        name: string,
        verboseName: string, 
        data: Array<SelectOptions>,
    },
    moneda: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    porcentajeHm: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    porcentajeHq: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    sumaAsegurada: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
    tipoPlan: {
        name: string, 
        verboseName: string, 
        data: Array<SelectOptions>,
    }, 
};


// --- Service: getCoverages --- // 
  // data to send 
  export type GetCoveragesFromCatalogIN = {
    idPlan: number, 
}
  // payload to receive from endpoint
export type GetCoveragesFromCatalogPayload = Array<{
    id: number,
    descripcion: string,
    tipo: "Base" | "Adicional", //lowercase
    editaSA: boolean,
    sumasAseguradas: Array<number> | null //sumasAseguradas
}>;


// --- Service: getDetallesPlanInitialData --- // 
  // data to send 
  export type GetDetallesPlanInitialDataIN = {
    idEmision: string, 
}
  // payload to receive from endpoint
export type GetDetallesPlanInitialDataPayload = {
    detallePlan: {
        tipoPlan: string,
        moneda: string,
        dependientes: number,
        sumaAsegurada: string,
        porcentajeHm: string,
        porcentajeHq: string,
        coaseguro: string,
        deducible: string,
        formaPago: string,
    },
    coberturas: Array<{
        id: number,
        tipo: string,
        prima: number,
        descripcion: string,
        sumaAsegurada: number
    }>,
    resultados: {
        subtotal: number,
        pagoFraccionado:  number,
        gastosExpedicion: number,
        total:  number
    }
}



// --- Service: sendToSuscripcionManual --- // 
  // data to send 
  export type sendToSuscripcionManualIN = {
    idEmision: string, 
}
  // payload to receive from endpoint
export type sendToSuscripcionManualPayload = { }



////////////// RELATED WHIT COMPONENTS /////////////////
