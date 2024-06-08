export async function fetchIp() {
  if (typeof window !== 'undefined' && window.client_ip) {
    return window.client_ip;
  }

  const res = await fetch('https://api.ipify.org?format=json', {
    next: {
      revalidate: false,
    },
  });

  if (res.ok) {
    const result: {ip: string} = await res.json();
    if (typeof window !== 'undefined') {
      window.client_ip = result.ip;
    }
    return result.ip;
  }

  return null;
}
