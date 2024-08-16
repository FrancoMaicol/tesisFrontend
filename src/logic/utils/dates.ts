export const calculateAge = (birthDate: Date) : number => {
    const todayTime = new Date();
    
    let age = todayTime.getFullYear() - birthDate.getFullYear(); //años

    //SI aun no se han cumplido años en el año en curso
    if(birthDate.getMonth() > todayTime.getMonth()){
        age--;
    }

    //SI c
    if(birthDate.getMonth() ===  todayTime.getMonth()){
        //Si aun no llega el dia de mi cumpleaños en el mes
        if(birthDate.getDate()+1 > todayTime.getDate())
            age--;                 
    }

    return age;
}


export const dateToStringYYYYMMDD = (date: Date) : string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}