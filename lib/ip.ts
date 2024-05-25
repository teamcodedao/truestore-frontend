export async function fetchIp() {
  const res = await fetch('/api/ip');

  if (res.ok) {
    const result: {ip: string} = await res.json();
    return result.ip;
  }

  return null;
}
