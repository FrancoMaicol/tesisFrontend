export function convertToPeso(number: number | null | undefined) : string{

    if(number === null || number === undefined){
        return "$0.00";
    }

    const formattedNumber = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(number);

    return formattedNumber;
}
