import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function VerifyPermisions(){

    const cookieStore = await cookies();
    
    /* Es necesario hacer un fetch para ver si el token sigue vigente */
    //const hasToken = cookieStore.has('auth-token');
    const hasRamo = cookieStore.has('id-ramo');

    //if(hasToken && hasRamo)
      //  redirect("/admin");

}


export async function getAuthToken(){
    const cookieStore = await cookies();
    const token__ = cookieStore.get('auth-token');

    /* ESO NECESITA VERIFICAR QUE EL TOKEN NO HAYA EXPIRADO */
    return token__?.value;
}