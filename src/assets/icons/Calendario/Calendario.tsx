type CalendarioIconProps = { fill: string; }
export default function Calendario({fill}:CalendarioIconProps) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fill}>
            <path d="M4.5 22C4.1 22 3.75 21.85 3.45 21.55C3.15 21.25 3 20.9 3 20.5V5C3 4.6 3.15 4.25 3.45 3.95C3.75 3.65 4.1 3.5 4.5 3.5H6.125V2H7.75V3.5H16.25V2H17.875V3.5H19.5C19.9 3.5 20.25 3.65 20.55 3.95C20.85 4.25 21 4.6 21 5V20.5C21 20.9 20.85 21.25 20.55 21.55C20.25 21.85 19.9 22 19.5 22H4.5ZM4.5 20.5H19.5V9.75H4.5V20.5ZM4.5 8.25H19.5V5H4.5V8.25Z"/>
        </svg>
    )
}

