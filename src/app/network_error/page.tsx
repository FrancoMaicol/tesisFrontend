"use client"
import { useSearchParams } from 'next/navigation'

export default function NetworkError(){

    const params = useSearchParams();

    const error_message = params.get("error_message");

    return(
        <div>
            <p>Error de red: 
                <a href="/">
                    <span style={{color: "red"}}>{error_message ? error_message : "error desconocido" }</span>    
                </a>    
            </p> 
        </div>
    )
}