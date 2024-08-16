import { IconsProps } from "@types"
export  function ToggleON({fill}:IconsProps) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="26" viewBox="0 0 50 26" fill="none">
            <rect x="0.5" y="0.5" width="49" height="25" rx="12.5" fill={fill} stroke={fill}/>
            <circle cx="35.5" cy="13" r="9" fill="white"/>
        </svg>
    )
}

export  function ToggleOFF({fill}:IconsProps) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="26" viewBox="0 0 50 26" fill="none">
            <rect x="0.5" y="0.5" width="49" height="25" rx="12.5" fill="white" stroke="#97999B"/>
            <circle cx="13" cy="13" r="9" fill="#97999B"/>
        </svg>
    )
}
