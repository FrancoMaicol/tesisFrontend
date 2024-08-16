type CancelIconProps = {
    fill: string;
}
function Cancel({fill}:CancelIconProps){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill={fill}>
            <path d="M16 28C12.68 28 9.85 26.83 7.51 24.49C5.17 22.15 4 19.3199 4 16C4 12.6801 5.17 9.85 7.51 7.51C9.85 5.17 12.68 4 16 4C19.32 4 22.15 5.17 24.49 7.51C26.83 9.85 28 12.6801 28 16C28 19.3199 26.83 22.15 24.49 24.49C22.15 26.83 19.32 28 16 28ZM11.74 21.94L16 17.68L20.2 21.94L21.94 20.26L17.68 16L21.94 11.74L20.26 10.06L16 14.32L11.74 10.06L10.06 11.74L14.32 16L10.06 20.26L11.74 21.94Z"/>
        </svg>
    )
}

export { Cancel };