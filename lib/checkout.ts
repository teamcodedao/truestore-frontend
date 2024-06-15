import {randomNumber} from './random';

export function generateReferenceId(domain: string) {
  const domainPart = domain.replace(/\.com$/, '').replace(/\.+/g, '');
  const randomChars = Math.random().toString(36).slice(2, 7);

  const referenceId = `${domainPart}-${randomChars}-${randomNumber(10000, 99999)}`;

  return referenceId;
}
