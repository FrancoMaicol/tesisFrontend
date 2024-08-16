export function getCookieClient(cookieToFind: string) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === cookieToFind) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null; // Si no se encuentra la cookie
}

export function getCookieServer(){
  
}