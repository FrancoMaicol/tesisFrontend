import Link from "next/link"
export default function InvalidToken(){
    return(
        <div>
            <span>Su sesion ha expirado</span> 
            <Link href="/login">Iniciar sesion</Link>
        </div>
    )
}