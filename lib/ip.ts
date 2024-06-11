import {getCookie, setCookie} from 'react-use-cookie';

export async function fetchIp() {
  const clientIp = getCookie('client_ip');

  if (clientIp) {
    return clientIp;
  }

  const res = await fetch('https://api.ipify.org?format=json', {
    next: {
      revalidate: false,
    },
  });

  if (res.ok) {
    const result: {ip: string} = await res.json();
    setCookie('client_ip', result.ip, {
      path: '/',
    });
    return result.ip;
  }

  return null;
}
