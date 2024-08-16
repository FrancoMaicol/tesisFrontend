import { cookies } from 'next/headers';

export async function getCookieServer(){
    const cookieStore = await cookies();
    const token__ = cookieStore.get('auth-token');

    /* ESO NECESITA VERIFICAR QUE EL TOKEN NO HAYA EXPIRADO */
    return token__?.value;
}